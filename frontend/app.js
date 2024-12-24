let web3;
let contract;
let userAccount;

const contractAddress = "0x1cA4899Aa2fb943a36870Bc9A6E128770394d105";
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "cause",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalDonations",
                "type": "uint256"
            }
        ],
        "name": "DonationMade",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "cause",
                "type": "string"
            }
        ],
        "name": "donateToCause",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "donationsForCause",
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
                "internalType": "string",
                "name": "cause",
                "type": "string"
            }
        ],
        "name": "getTotalDonations",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

window.addEventListener('load', () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Web3 is connected");
    } else {
        alert("Please install MetaMask to interact with this application.");
    }
});

// Connect to MetaMask
document.getElementById("connectButton").addEventListener("click", async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        console.log("Connected account:", userAccount);
    } catch (error) {
        console.error("Connection failed:", error);
    }
});

// Donate to a cause
document.getElementById("donateButton").addEventListener("click", async () => {
    const cause = document.getElementById("cause").value;
    const donationAmount = document.getElementById("donationAmount").value;

    if (!cause || donationAmount <= 0) {
        alert("Please provide a valid cause and donation amount.");
        return;
    }

    try {
        await contract.methods.donateToCause(cause)
            .send({ from: userAccount, value: web3.utils.toWei(donationAmount, 'ether') });
        alert(`You donated ${donationAmount} ETH to the cause: ${cause}`);
    } catch (error) {
        console.error("Donation failed:", error);
    }
});

// View total donations for a cause
document.getElementById("viewTotalButton").addEventListener("click", async () => {
    const cause = document.getElementById("viewCause").value;

    if (!cause) {
        alert("Please provide a valid cause.");
        return;
    }

    try {
        const totalDonations = await contract.methods.getTotalDonations(cause).call();
        document.getElementById("totalDonationsDisplay").innerText =
            `Total Donations for ${cause}: ${web3.utils.fromWei(totalDonations, 'ether')} ETH`;
    } catch (error) {
        console.error("Error retrieving total donations:", error);
    }
});
