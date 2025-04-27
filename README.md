
# IPFS_with_Solidity

A decentralized file storage system built using **Solidity**, **IPFS**, and **MetaMask**. This DApp allows users to securely upload files to IPFS and store the corresponding hash on the blockchain. Later, users can retrieve their files using the hash, ensuring security, decentralization, and immutability.

---

## 🚀 Features

- 🔐 Connect MetaMask wallet to interact with the blockchain
- 📤 Upload files and store them on **IPFS** using `web3.storage`
- 🧾 Record IPFS hash on Ethereum-compatible blockchain via a smart contract
- 📥 Retrieve files using stored hashes
- 🎨 User-friendly frontend built with HTML, CSS, and JavaScript

---

## 🗂️ Project Structure

```
IPFS_with_Solidity/
├── client/                       # Frontend UI
│   ├── index.html
│   ├── style.css
│   └── wallet.js
│
├── server/                       # Backend server (optional usage)
│   └── server.js
│
├── smart-contract/
│   └── contracts/               # Solidity smart contracts
│       └── FileStorage.sol
│
├── ignition/modules/            # Hardhat deployment module
│   └── Lock.js
│
├── scripts/                     # Hardhat scripts (e.g., deploy)
│
├── test/                        # Contract test cases
│
├── uploads/                     # Temporary file storage
│
├── hardhat.config.js            # Hardhat config
├── package.json
├── package-lock.json
├── .gitignore
└── README.md                    # You’re reading it!
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/IPFS_with_Solidity.git
   cd IPFS_with_Solidity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the smart contract**
   ```bash
   npx hardhat compile
   ```

4. **Run a local blockchain (optional)**
   ```bash
   npx hardhat node
   ```

5. **Deploy the contract**
   ```bash
   npx hardhat ignition deploy ./ignition/modules/Lock.js
   ```

6. **Start the frontend**
   Open `client/index.html` in your browser.

---

## 🧪 Usage Instructions

1. 🦊 **Connect MetaMask**  
   Make sure MetaMask is installed and connected to the correct network (e.g., local or Goerli testnet).

2. 📤 **Upload a file**  
   - Click on **"Choose File"**
   - Click **"Upload"**
   - The file is sent to IPFS, and the hash is saved to the blockchain

3. 🔗 **Retrieve file**  
   Use the saved IPFS hash to retrieve the file anytime using a public IPFS gateway

---

## 🧱 Tech Stack

- **Smart Contracts**: Solidity, Hardhat
- **Frontend**: HTML, CSS, JavaScript
- **Wallet Integration**: MetaMask + Ethers.js
- **File Storage**: IPFS via [web3.storage](https://web3.storage)
- **Local Blockchain**: Hardhat

---

## 🧰 Scripts & Commands

```bash
npx hardhat help                       # List all available Hardhat tasks
npx hardhat compile                   # Compile contracts
npx hardhat test                      # Run tests
npx hardhat node                      # Start local Hardhat blockchain
npx hardhat ignition deploy ./ignition/modules/Lock.js  # Deploy contract
```

---

## ⚠️ Troubleshooting

- **`ethers is not defined`**  
  ➤ Ensure you include the ethers.js CDN in your `index.html` **before** any custom JS:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
  ```

- **MetaMask not connecting**  
  ➤ Make sure MetaMask is unlocked and connected to the correct network. Refresh the page after approving.

- **Unexpected token 'export'**  
  ➤ Use `<script type="module">` only if you’re writing ES6 imports/exports.

---


please make sure you have pinita ipfs key and secret. 
--> create an .env file and paste your pinita ipfs key and secret like this 

PINATA_API_KEY=xxxxxxxxxxxxxxxxxx  // this should be an alpha numeric character
PINATA_SECRET_API_KEY=xxxxxxxxxxxxxxxxxxxxx // this should also be a alpha numeric charecter

## 🙌 Acknowledgments

Thanks to:
- [MetaMask](https://metamask.io/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [web3.storage](https://web3.storage/)
- [Hardhat](https://hardhat.org/)
