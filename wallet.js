// wallet.js

async function connectWallet(updateUI) {
    if (!window.ethereum) {
        alert("Please install MetaMask.");
        updateUI("❌ MetaMask not found");
        return false;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected accounts:", accounts);

        if (accounts.length === 0) {
            updateUI("❌ No accounts connected");
            return false;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        updateUI("🟢 Connected: " + address);
        return { provider, signer, address };

    } catch (err) {
        console.error("Wallet connection failed:", err);
        updateUI("❌ Connection failed: " + err.message);
        return false;
    }
}

function setupWalletEventListeners(updateUI, reloadPage) {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', async (newAccounts) => {
            console.log("Account changed:", newAccounts);
            if (newAccounts.length > 0) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                updateUI("🟢 Connected: " + address);
            } else {
                updateUI("❌ Disconnected");
            }
        });

        window.ethereum.on('chainChanged', (_chainId) => {
            console.log("Chain changed:", _chainId);
            reloadPage();
        });
    }
}