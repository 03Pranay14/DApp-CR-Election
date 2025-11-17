// ==================== CONTRACT CONFIGURATION ====================
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_department",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "castVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "removeCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "department",
				"type": "string"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "ElectionStatusChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "resetElectionComplete",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "VoteCasted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "department",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionCommissioner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionStatus",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCandidates",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getCandidate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			}
		],
		"name": "getVoterInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isElectionActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "votedCandidateId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = "0x8451961927D8E8867032Fe0Bb1F6AC33956Ce450";

// ==================== GLOBAL VARIABLES ====================
let web3;
let contract;
let currentAccount;
let isAdmin = false;

// ==================== WEB3 INITIALIZATION ====================
async function initWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            web3 = new Web3(window.ethereum);
            console.log('✅ Web3 initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Web3:', error);
            showNotification('Error initializing Web3', 'error');
            return false;
        }
    } else {
        showNotification('Please install MetaMask!', 'error');
        return false;
    }
}

// ==================== WALLET CONNECTION ====================
async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];
        
        document.getElementById('connectWalletBtn').textContent = 
            `${currentAccount.substring(0, 6)}...${currentAccount.substring(38)}`;
        
        contract = new web3.eth.Contract(contractABI, contractAddress);
        
        await checkAdminRole();
        await loadElectionData();
        
        showNotification('✅ Wallet connected successfully!', 'success');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showNotification('Failed to connect wallet', 'error');
    }
}

// ==================== ADMIN ROLE CHECK ====================
async function checkAdminRole() {
    try {
        const commissioner = await contract.methods.electionCommissioner().call();
        
        if (commissioner.toLowerCase() === currentAccount.toLowerCase()) {
            isAdmin = true;
            document.getElementById('adminSection').style.display = 'block';
            console.log('✅ Admin access granted');
        } else {
            isAdmin = false;
            document.getElementById('adminSection').style.display = 'none';
            console.log('👤 Regular voter access');
        }
    } catch (error) {
        console.error('Error checking admin role:', error);
        isAdmin = false;
        document.getElementById('adminSection').style.display = 'none';
    }
}

// ==================== LOAD ELECTION DATA ====================
async function loadElectionData() {
    if (!contract || !currentAccount) {
        console.log('⚠️ Contract or account not initialized');
        return;
    }

    try {
        // UPDATED: Get election status (works with optimized contract)
        const status = await contract.methods.electionStatus().call();
        const isActive = (status == 2);  // 2 = Active, 1 = Inactive
        
        const statusElement = document.getElementById('electionStatus');
        
        if (isActive) {
            statusElement.textContent = '✅ Active';
            statusElement.style.color = '#28a745';
        } else {
            statusElement.textContent = '❌ Inactive';
            statusElement.style.color = '#dc3545';
        }
        
        // Get voter info
        try {
            const voterInfo = await contract.methods.getVoterInfo(currentAccount).call();
            const registered = voterInfo[0];
            const hasVoted = voterInfo[1];
            
            const voterStatusElement = document.getElementById('voterStatus');
            if (!registered) {
                voterStatusElement.textContent = '❌ Not Registered';
                voterStatusElement.style.color = '#dc3545';
            } else if (hasVoted) {
                voterStatusElement.textContent = '✅ Voted';
                voterStatusElement.style.color = '#28a745';
            } else {
                voterStatusElement.textContent = '⏳ Can Vote';
                voterStatusElement.style.color = '#ffc107';
            }
        } catch (error) {
            document.getElementById('voterStatus').textContent = '❌ Not Registered';
        }
        
        // Load total votes
        const totalVotes = await contract.methods.totalVotes().call();
        document.getElementById('totalVotes').textContent = totalVotes;
        
        // Load candidates
        await loadCandidates(isActive);
        
        // Load results
        await loadResults();
        
        // Load winner if election ended
        if (!isActive) {
            await loadWinner();
        } else {
            document.getElementById('winnerSection').style.display = 'none';
        }
        
        console.log('✅ Election data loaded successfully');
    } catch (error) {
        console.error('Error loading election data:', error);
        showNotification('Failed to load election data', 'error');
    }
}

// ==================== LOAD CANDIDATES ====================
async function loadCandidates(isActive) {
    try {
        const candidatesData = await contract.methods.getAllCandidates().call();
        const container = document.getElementById('candidatesContainer');
        container.innerHTML = '';
        
        if (!candidatesData || candidatesData[0].length === 0) {
            container.innerHTML = '<p style="color: #c5c6c7; text-align: center;">📋 No candidates available yet.</p>';
            return;
        }
        
        // Check voter status
        const voterInfo = await contract.methods.getVoterInfo(currentAccount).call();
        const canVote = voterInfo[0] && !voterInfo[1] && isActive;
        
        // Create candidate cards
        for (let i = 0; i < candidatesData[0].length; i++) {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.innerHTML = `
                <h3>${candidatesData[1][i]}</h3>
                <p>🏫 ${candidatesData[2][i]}</p>
                <div class="vote-count">${candidatesData[3][i]} votes</div>
                <button class="vote-btn" onclick="castVote(${candidatesData[0][i]})" 
                    ${!canVote ? 'disabled' : ''}>
                    ${canVote ? '🗳️ Vote' : '❌ Unavailable'}
                </button>
            `;
            container.appendChild(card);
        }
        
        console.log(`✅ Loaded ${candidatesData[0].length} candidates`);
    } catch (error) {
        console.error('Error loading candidates:', error);
        document.getElementById('candidatesContainer').innerHTML = 
            '<p style="color: #dc3545; text-align: center;">❌ Failed to load candidates</p>';
    }
}

// ==================== LOAD RESULTS ====================
async function loadResults() {
    try {
        const candidatesData = await contract.methods.getAllCandidates().call();
        const container = document.getElementById('resultsContainer');
        container.innerHTML = '';
        
        if (!candidatesData || candidatesData[0].length === 0) {
            container.innerHTML = '<p style="color: #c5c6c7; text-align: center;">📊 No results available yet.</p>';
            return;
        }
        
        // Sort candidates by vote count
        const results = [];
        for (let i = 0; i < candidatesData[0].length; i++) {
            results.push({
                id: candidatesData[0][i],
                name: candidatesData[1][i],
                dept: candidatesData[2][i],
                votes: parseInt(candidatesData[3][i])
            });
        }
        results.sort((a, b) => b.votes - a.votes);
        
        // Display top 3
        for (let i = 0; i < Math.min(3, results.length); i++) {
            const card = document.createElement('div');
            card.className = 'result-card';
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
            card.innerHTML = `
                <h4>${medal} ${results[i].name}</h4>
                <p>${results[i].dept}</p>
                <div class="vote-number">${results[i].votes}</div>
            `;
            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

// ==================== LOAD WINNER ====================
async function loadWinner() {
    try {
        const candidateCount = await contract.methods.candidateCount().call();
        
        if (candidateCount == 0) {
            document.getElementById('winnerSection').style.display = 'none';
            return;
        }
        
        const totalVotes = await contract.methods.totalVotes().call();
        
        if (totalVotes == 0) {
            document.getElementById('winnerSection').style.display = 'none';
            return;
        }
        
        // Find winner
        const candidatesData = await contract.methods.getAllCandidates().call();
        let maxVotes = 0;
        let winnerIndex = -1;
        
        for (let i = 0; i < candidatesData[0].length; i++) {
            const votes = parseInt(candidatesData[3][i]);
            if (votes > maxVotes) {
                maxVotes = votes;
                winnerIndex = i;
            }
        }
        
        if (winnerIndex !== -1 && maxVotes > 0) {
            document.getElementById('winnerName').textContent = candidatesData[1][winnerIndex];
            document.getElementById('winnerDept').textContent = candidatesData[2][winnerIndex];
            document.getElementById('winnerVotes').textContent = `${maxVotes} votes`;
            document.getElementById('winnerSection').style.display = 'block';
        } else {
            document.getElementById('winnerSection').style.display = 'none';
        }
    } catch (error) {
        console.log('Winner not available:', error.message);
        document.getElementById('winnerSection').style.display = 'none';
    }
}

// ==================== ADMIN: ADD CANDIDATE ====================
async function addCandidate() {
    if (!isAdmin) {
        showNotification('❌ Only admin can add candidates!', 'error');
        return;
    }
    
    const name = document.getElementById('candidateName').value.trim();
    const dept = document.getElementById('candidateDept').value.trim();
    
    if (!name || !dept) {
        showNotification('⚠️ Please fill all fields', 'error');
        return;
    }
    
    try {
        showNotification('⏳ Adding candidate...', 'info');
        
        await contract.methods.addCandidate(name, dept)
            .send({ from: currentAccount });
        
        showNotification(`✅ ${name} added successfully!`, 'success');
        
        document.getElementById('candidateName').value = '';
        document.getElementById('candidateDept').value = '';
        
        await loadElectionData();
    } catch (error) {
        console.error('Error adding candidate:', error);
        showNotification('❌ Failed to add candidate', 'error');
    }
}

// ==================== ADMIN: REGISTER VOTER ====================
async function registerVoter() {
    if (!isAdmin) {
        showNotification('❌ Only admin can register voters!', 'error');
        return;
    }
    
    const address = document.getElementById('voterAddress').value.trim();
    
    if (!address || !web3.utils.isAddress(address)) {
        showNotification('⚠️ Invalid Ethereum address', 'error');
        return;
    }
    
    try {
        showNotification('⏳ Registering voter...', 'info');
        
        await contract.methods.registerVoter(address)
            .send({ from: currentAccount });
        
        showNotification('✅ Voter registered successfully!', 'success');
        document.getElementById('voterAddress').value = '';
        
        if (address.toLowerCase() === currentAccount.toLowerCase()) {
            await loadElectionData();
        }
    } catch (error) {
        console.error('Error registering voter:', error);
        showNotification('❌ Failed to register voter', 'error');
    }
}

// ==================== ADMIN: START ELECTION ====================
async function startElection() {
    if (!isAdmin) {
        showNotification('❌ Only admin can start election!', 'error');
        return;
    }
    
    try {
        if (!confirm('Start the election now?')) {
            return;
        }
        
        showNotification('⏳ Starting election...', 'info');
        
        await contract.methods.startElection()
            .send({ from: currentAccount });
        
        showNotification('✅ Election started successfully!', 'success');
        await loadElectionData();
    } catch (error) {
        console.error('Error starting election:', error);
        showNotification('❌ Failed to start election', 'error');
    }
}

// ==================== ADMIN: END ELECTION ====================
async function endElection() {
    if (!isAdmin) {
        showNotification('❌ Only admin can end election!', 'error');
        return;
    }
    
    try {
        if (!confirm('End the election now?')) {
            return;
        }
        
        showNotification('⏳ Ending election...', 'info');
        
        await contract.methods.endElection()
            .send({ from: currentAccount });
        
        showNotification('✅ Election ended successfully!', 'success');
        await loadElectionData();
    } catch (error) {
        console.error('Error ending election:', error);
        showNotification('❌ Failed to end election', 'error');
    }
}

// ==================== ADMIN: DECLARE RESULTS ====================
async function declareResults() {
    if (!isAdmin) {
        showNotification('❌ Only admin can declare results!', 'error');
        return;
    }
    
    try {
        // UPDATED: Check election status
        const status = await contract.methods.electionStatus().call();
        const isActive = (status == 2);
        
        if (isActive) {
            showNotification('⚠️ End election first!', 'error');
            return;
        }
        
        const totalVotes = await contract.methods.totalVotes().call();
        
        if (totalVotes == 0) {
            showNotification('⚠️ No votes cast yet!', 'error');
            return;
        }
        
        showNotification('⏳ Declaring results...', 'info');
        await loadWinner();
        showNotification('✅ Results declared!', 'success');
    } catch (error) {
        console.error('Error declaring results:', error);
        showNotification('❌ Failed to declare results', 'error');
    }
}

// ==================== ADMIN: RESET ELECTION ====================
async function resetElection() {
    if (!isAdmin) {
        showNotification('❌ Only admin can reset election!', 'error');
        return;
    }
    
    try {
        // UPDATED: Check election status
        const status = await contract.methods.electionStatus().call();
        const isActive = (status == 2);
        
        if (isActive) {
            showNotification('⚠️ End election first!', 'error');
            return;
        }
        
        if (!confirm('⚠️ WARNING: Delete all data?\n\nThis cannot be undone!')) {
            return;
        }
        
        showNotification('⏳ Resetting election...', 'info');
        
        await contract.methods.resetElectionComplete()
            .send({ from: currentAccount });
        
        showNotification('✅ Election reset!', 'success');
        document.getElementById('winnerSection').style.display = 'none';
        
        await loadElectionData();
    } catch (error) {
        console.error('Error resetting election:', error);
        showNotification('❌ Failed to reset election', 'error');
    }
}

// ==================== VOTER: CAST VOTE ====================
async function castVote(candidateId) {
    try {
        const candidate = await contract.methods.getCandidate(candidateId).call();
        
        if (!confirm(`Vote for ${candidate[1]} (${candidate[2]})?\n\nThis cannot be changed!`)) {
            return;
        }
        
        showNotification('⏳ Casting your vote...', 'info');
        
        await contract.methods.castVote(candidateId)
            .send({ from: currentAccount });
        
        showNotification('✅ Vote cast successfully!', 'success');
        await loadElectionData();
    } catch (error) {
        console.error('Error casting vote:', error);
        
        if (error.message.includes('already voted')) {
            showNotification('❌ Already voted!', 'error');
        } else if (error.message.includes('not registered')) {
            showNotification('❌ Not registered!', 'error');
        } else {
            showNotification('❌ Failed to cast vote', 'error');
        }
    }
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 CR Election System Loaded');
    
    await initWeb3();
    
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('addCandidateBtn').addEventListener('click', addCandidate);
    document.getElementById('registerVoterBtn').addEventListener('click', registerVoter);
    document.getElementById('startElectionBtn').addEventListener('click', startElection);
    document.getElementById('endElectionBtn').addEventListener('click', endElection);
    document.getElementById('declareResultBtn').addEventListener('click', declareResults);
    document.getElementById('resetElectionBtn').addEventListener('click', resetElection);
    
    // MetaMask event listeners
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length > 0) {
                currentAccount = accounts[0];
                await checkAdminRole();
                await loadElectionData();
            } else {
                location.reload();
            }
        });
        
        window.ethereum.on('chainChanged', () => location.reload());
    }
});
