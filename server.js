require('dotenv').config();  // MUST BE THE VERY FIRST LINE!

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// DEBUGGING - Print IMMEDIATELY after loading
console.log("PINATA_API_KEY:", PINATA_API_KEY);
console.log("PINATA_SECRET_API_KEY:", PINATA_SECRET_API_KEY);

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

// Explicit check for API keys (This is IMPORTANT)
if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
  console.error('Error: PINATA_API_KEY and PINATA_SECRET_API_KEY must be set in .env file');
  process.exit(1);  // Exit the process to prevent further errors
}

app.post('/upload', upload.single('document'), async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileStream = fs.createReadStream(file.path);
    const formData = new FormData();
    formData.append('file', fileStream);

    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            maxBodyLength: Infinity,
            headers: {
                ...formData.getHeaders(),
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_SECRET_API_KEY
            }
        });

        fs.unlinkSync(file.path); // Delete the file after uploading

        res.json({ success: true, hash: response.data.IpfsHash });
    } catch (error) {
        console.error("Upload error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Failed to upload to IPFS' });
    }
});

const PORT = 5000; // Use a constant value for the port
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));