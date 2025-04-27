// server.js
require('dotenv').config();  // FIRST LINE

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const app = express();
app.use(cors());

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;
const upload = multer({ dest: 'uploads/' });

const CID_HISTORY_FILE = path.join(__dirname, 'cid_history.json');

// Create an empty cid_history.json if not exist
if (!fs.existsSync(CID_HISTORY_FILE)) {
  fs.writeFileSync(CID_HISTORY_FILE, JSON.stringify([]));
  console.log('cid_history.json created ✅');
}

// Safety check for API keys
if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) {
  console.error('❌ Error: Missing Pinata API keys. Please check your .env file.');
  process.exit(1);
}

// Upload endpoint
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

    fs.unlinkSync(file.path); // Clean up temp file

    // Append new CID to cid_history.json
    const cidHistory = JSON.parse(fs.readFileSync(CID_HISTORY_FILE));
    cidHistory.push({
      cid: response.data.IpfsHash,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(CID_HISTORY_FILE, JSON.stringify(cidHistory, null, 2));

    res.json({ success: true, hash: response.data.IpfsHash });
  } catch (error) {
    console.error('Error uploading to IPFS:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to upload to IPFS' });
  }
});

// Fetch CID history
app.get('/cid-history', (req, res) => {
  try {
    const cidHistory = JSON.parse(fs.readFileSync(CID_HISTORY_FILE));
    res.json({ success: true, history: cidHistory });
  } catch (error) {
    console.error('Error reading cid_history.json:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch CID history' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
