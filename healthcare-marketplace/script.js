// Connect to MetaMask
const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
        await ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(ethereum);
        console.log("MetaMask connected");
    } else {
        alert("MetaMask not installed!");
    }
};

// Register patient data using MetaMask
const registerPatientData = async (dataHash) => {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = '0x561b42ca40f3b0c56b80849021666bd710f49c62'; // Replace with your deployed contract address
    const contractABI = [[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "researcher",
				"type": "address"
			}
		],
		"name": "DataAccessGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "researcher",
				"type": "address"
			}
		],
		"name": "DataAccessRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_researcher",
				"type": "address"
			}
		],
		"name": "grantAccess",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_medicalDataHash",
				"type": "string"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_researcher",
				"type": "address"
			}
		],
		"name": "revokeAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patient",
				"type": "address"
			}
		],
		"name": "getMedicalData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
		"name": "patients",
		"outputs": [
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "medicalDataHash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    
    // Send transaction from MetaMask
    contract.methods.registerPatient(dataHash).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            document.getElementById('result').innerText = 'Transaction Hash: ' + hash;
        })
        .on('error', (error) => {
            console.error("Error:", error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
};

// Grant access to a researcher
const grantAccess = async (researcherAddress) => {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = '0xYourDeployedContractAddress'; // Replace with your deployed contract address
    const contractABI = [/* Paste ABI here from HealthcareDataMarketplaceABI.json */];

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    
    // Send transaction from MetaMask
    contract.methods.grantAccess(researcherAddress).send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') })
        .on('transactionHash', (hash) => {
            document.getElementById('result').innerText = 'Access Granted. Transaction Hash: ' + hash;
        })
        .on('error', (error) => {
            console.error("Error:", error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
};

// Revoke access from a researcher
const revokeAccess = async (researcherAddress) => {
    const accounts = await web3.eth.getAccounts();
    const contractAddress = '0xYourDeployedContractAddress'; // Replace with your deployed contract address
    const contractABI = [/* Paste ABI here from HealthcareDataMarketplaceABI.json */];

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    
    // Send transaction from MetaMask
    contract.methods.revokeAccess(researcherAddress).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            document.getElementById('result').innerText = 'Access Revoked. Transaction Hash: ' + hash;
        })
        .on('error', (error) => {
            console.error("Error:", error);
            document.getElementById('result').innerText = 'Error: ' + error.message;
        });
};

// Handle form submissions
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dataHash = document.getElementById('dataHash').value;
    registerPatientData(dataHash);
});

document.getElementById('grantAccessForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const researcherAddress = document.getElementById('researcherAddress').value;
    grantAccess(researcherAddress);
});

document.getElementById('revokeAccessForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const revokeAddress = document.getElementById('revokeAddress').value;
    revokeAccess(revokeAddress);
});

// Connect to MetaMask when the page loads
window.onload = connectMetaMask;
