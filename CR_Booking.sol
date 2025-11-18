// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title CRElectionVoting
 * @notice Admin deploys contract and becomes election commissioner
 */
contract CRElectionVoting {
    
    // ==================== EVENTS ====================
    event CandidateAdded(uint indexed candidateId, string name);
    event VoterRegistered(address indexed voter);
    event VoteCasted(address indexed voter, uint indexed candidateId);
    event ElectionStarted();
    event ElectionEnded();
    event ElectionReset();
    
    // ==================== STRUCTS ====================
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        bool exists;
    }
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedCandidateId;
    }
    
    // ==================== STATE VARIABLES ====================
    address public immutable electionCommissioner;
    bool public isElectionActive;
    uint public candidateCount;
    uint public totalVotes;
    
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    
    // ==================== MODIFIERS ====================
    modifier onlyCommissioner() {
        require(msg.sender == electionCommissioner, "Only commissioner can perform this action");
        _;
    }
    
    modifier whenActive() {
        require(isElectionActive, "Election is not active");
        _;
    }
    
    modifier whenNotActive() {
        require(!isElectionActive, "Election is currently active");
        _;
    }
    
    // ==================== CONSTRUCTOR ====================
    constructor() {
        electionCommissioner = msg.sender;
        isElectionActive = false;
    }
    
    // ==================== ADMIN FUNCTIONS ====================
    
    /**
     * @dev Add a new candidate (only name)
     * @param _name Candidate name
     */
    function addCandidate(string memory _name) 
        public 
        onlyCommissioner 
        whenNotActive 
    {
        require(bytes(_name).length > 0 && bytes(_name).length <= 50, "Invalid name length");
        
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            name: _name,
            voteCount: 0,
            exists: true
        });
        
        emit CandidateAdded(candidateCount, _name);
    }
    
    /**
     * @dev Register a voter
     * @param _voterAddress Address of the voter to register
     */
    function registerVoter(address _voterAddress) 
        public 
        onlyCommissioner 
    {
        require(_voterAddress != address(0), "Invalid address");
        require(!voters[_voterAddress].isRegistered, "Voter already registered");
        
        voters[_voterAddress] = Voter({
            isRegistered: true,
            hasVoted: false,
            votedCandidateId: 0
        });
        
        emit VoterRegistered(_voterAddress);
    }
    
    /**
     * @dev Start the election
     */
    function startElection() 
        public 
        onlyCommissioner 
        whenNotActive 
    {
        require(candidateCount > 0, "No candidates available");
        isElectionActive = true;
        emit ElectionStarted();
    }
    
    /**
     * @dev End the election
     */
    function endElection() 
        public 
        onlyCommissioner 
        whenActive 
    {
        isElectionActive = false;
        emit ElectionEnded();
    }
    
    /**
     * @dev Reset the entire election (only when not active)
     */
    function resetElection() 
        public 
        onlyCommissioner 
        whenNotActive 
    {
        // Reset counters
        totalVotes = 0;
        uint oldCandidateCount = candidateCount;
        candidateCount = 0;
        
        // Clear candidate data (gas efficient for small numbers)
        for (uint i = 1; i <= oldCandidateCount; i++) {
            delete candidates[i];
        }
        
        emit ElectionReset();
    }
    
    // ==================== VOTER FUNCTIONS ====================
    
    /**
     * @dev Cast a vote for a candidate
     * @param _candidateId ID of the candidate to vote for
     */
    function castVote(uint _candidateId) 
        public 
        whenActive 
    {
        Voter storage voter = voters[msg.sender];
        
        require(voter.isRegistered, "You are not registered to vote");
        require(!voter.hasVoted, "You have already voted");
        require(candidates[_candidateId].exists, "Invalid candidate");
        
        voter.hasVoted = true;
        voter.votedCandidateId = _candidateId;
        
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCasted(msg.sender, _candidateId);
    }
    
    // ==================== VIEW FUNCTIONS ====================
    
    /**
     * @dev Get candidate information
     * @param _candidateId Candidate ID
     * @return id Candidate ID
     * @return name Candidate name
     * @return voteCount Number of votes received
     */
    function getCandidate(uint _candidateId) 
        public 
        view 
        returns (
            uint id,
            string memory name,
            uint voteCount
        ) 
    {
        require(candidates[_candidateId].exists, "Candidate not found");
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.voteCount);
    }
    
    /**
     * @dev Get all candidates
     * @return ids Array of candidate IDs
     * @return names Array of candidate names
     * @return voteCounts Array of vote counts
     */
    function getAllCandidates() 
        public 
        view 
        returns (
            uint[] memory ids,
            string[] memory names,
            uint[] memory voteCounts
        ) 
    {
        uint activeCount = 0;
        
        // Count active candidates
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].exists) {
                activeCount++;
            }
        }
        
        // Initialize arrays
        ids = new uint[](activeCount);
        names = new string[](activeCount);
        voteCounts = new uint[](activeCount);
        
        // Populate arrays
        uint index = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].exists) {
                ids[index] = candidates[i].id;
                names[index] = candidates[i].name;
                voteCounts[index] = candidates[i].voteCount;
                index++;
            }
        }
        
        return (ids, names, voteCounts);
    }
    
    /**
     * @dev Get voter information
     * @param _voterAddress Address of the voter
     * @return isRegistered Whether the voter is registered
     * @return hasVoted Whether the voter has voted
     * @return votedCandidateId ID of the candidate voted for (0 if not voted)
     */
    function getVoterInfo(address _voterAddress) 
        public 
        view 
        returns (
            bool isRegistered,
            bool hasVoted,
            uint votedCandidateId
        ) 
    {
        Voter memory v = voters[_voterAddress];
        return (v.isRegistered, v.hasVoted, v.votedCandidateId);
    }
    
    /**
     * @dev Get the current winner (most votes)
     * @return winnerId ID of the winning candidate
     * @return winnerName Name of the winning candidate
     * @return winnerVotes Number of votes the winner received
     */

     
    function getWinner() 
        public 
        view 
        returns (
            uint winnerId,
            string memory winnerName,
            uint winnerVotes
        ) 
    {
        require(!isElectionActive, "Election is still active");
        require(totalVotes > 0, "No votes cast");
        
        uint maxVotes = 0;
        uint winnerCandidateId = 0;
        
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].exists && candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerCandidateId = i;
            }
        }
        
        require(winnerCandidateId != 0, "No winner found");
        
        Candidate memory winner = candidates[winnerCandidateId];
        return (winner.id, winner.name, winner.voteCount);
    }
    
    /**
     * @dev Get election status summary
     * @return active Whether election is active
     * @return numCandidates Total number of candidates
     * @return numVotes Total votes cast
     * @return commissioner Address of election commissioner
     */
    function getElectionStatus() 
        public 
        view 
        returns (
            bool active,
            uint numCandidates,
            uint numVotes,
            address commissioner
        ) 
    {
        return (
            isElectionActive,
            candidateCount,
            totalVotes,
            electionCommissioner
        );
    }
}