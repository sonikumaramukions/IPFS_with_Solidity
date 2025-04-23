const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const uploadToIPFS = async (filePath) => {
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      maxBodyLength: Infinity,
      headers: {
        ...data.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
      }
    });

    //fs.unlinkSync(filePath); // delete the temp file after upload -- Removing this line as it might interfere in server.js
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response?.data || error.message);
    throw new Error('IPFS upload failed');
  }
};

module.exports = { uploadToIPFS };