// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CRElectionVoting {
    
    event CandidateAdded(uint indexed candidateId, string name, string department);
    event VoteCasted(address indexed voter, uint indexed candidateId);
    event ElectionStatusChanged(uint8 status);
    
    struct Candidate {
        uint id;
        string name;
        string department;
        uint voteCount;
        bool exists;
    }
    
    struct Voter {
        bool hasVoted;
        uint votedCandidateId;
        bool isRegistered;
    }
    
    address public immutable electionCommissioner;
    uint8 public electionStatus;  // 1 = Inactive, 2 = Active
    uint public candidateCount;
    uint public totalVotes;
    
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    
    modifier onlyCommissioner() {
        require(msg.sender == electionCommissioner, "Only commissioner");
        _;
    }
    
    modifier electionIsActive() {
        require(electionStatus == 2, "Election not active");
        _;
    }
    
    modifier electionNotActive() {
        require(electionStatus == 1, "Election active");
        _;
    }
    
    constructor() {
        electionCommissioner = msg.sender;
        electionStatus = 1;  // Start with 1 (non-zero)
    }
    
    function addCandidate(string memory _name, string memory _department) 
        public onlyCommissioner electionNotActive 
    {
        require(bytes(_name).length > 0, "Name empty");
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _department, 0, true);
        emit CandidateAdded(candidateCount, _name, _department);
    }
    
    function registerVoter(address _voterAddress) public onlyCommissioner {
        require(!voters[_voterAddress].isRegistered, "Already registered");
        voters[_voterAddress] = Voter(false, 0, true);
    }
    
    function castVote(uint _candidateId) public electionIsActive {
        require(voters[msg.sender].isRegistered, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidates[_candidateId].exists, "Invalid candidate");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        candidates[_candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCasted(msg.sender, _candidateId);
    }
    
    function getCandidate(uint _candidateId) public view 
        returns (uint, string memory, string memory, uint) 
    {
        require(candidates[_candidateId].exists, "Not found");
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.department, c.voteCount);
    }
    
    function getAllCandidates() public view 
        returns (uint[] memory, string[] memory, string[] memory, uint[] memory) 
    {
        uint activeCount = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].exists) activeCount++;
        }
        
        uint[] memory ids = new uint[](activeCount);
        string[] memory names = new string[](activeCount);
        string[] memory departments = new string[](activeCount);
        uint[] memory voteCounts = new uint[](activeCount);
        
        uint index = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].exists) {
                ids[index] = candidates[i].id;
                names[index] = candidates[i].name;
                departments[index] = candidates[i].department;
                voteCounts[index] = candidates[i].voteCount;
                index++;
            }
        }
        return (ids, names, departments, voteCounts);
    }
    
    function getVoterInfo(address _voterAddress) public view 
        returns (bool, bool, uint) 
    {
        Voter memory v = voters[_voterAddress];
        return (v.isRegistered, v.hasVoted, v.votedCandidateId);
    }
    
    // OPTIMIZED: Changes 1 → 2 (non-zero to non-zero = only 5,000 gas!)
    function startElection() public onlyCommissioner electionNotActive {
        electionStatus = 2;
        emit ElectionStatusChanged(2);
    }
    
    // OPTIMIZED: Changes 2 → 1 (non-zero to non-zero = only 5,000 gas!)
    function endElection() public onlyCommissioner electionIsActive {
        electionStatus = 1;
        emit ElectionStatusChanged(1);
    }
    
    function removeCandidate(uint _candidateId) public onlyCommissioner electionNotActive {
        require(candidates[_candidateId].exists, "Not found");
        candidates[_candidateId].exists = false;
    }
    
    function resetElectionComplete() public onlyCommissioner electionNotActive {
        candidateCount = 0;
        totalVotes = 0;
    }
    
    // Helper function to check if election is active (for frontend)
    function isElectionActive() public view returns (bool) {
        return electionStatus == 2;
    }
}
