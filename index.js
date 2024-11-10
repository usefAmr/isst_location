import express from "express";
import axios from'axios';
import IpAddr from 'ipaddr.js'
import ip from 'ip'

const app = express();

app.set("trust proxy", true);
const getClientIP = (req) => {
  let forwardedFor = req.headers['x-forwarded-for'];
  let ip = forwardedFor ? forwardedFor.split(',')[0] : null;
  
  if (!ip) {
    ip = req.connection.remoteAddress;
  }
  
  return ip;
};

app.get("/", async (req, res) => {
  // Set endpoint and your access key
  const clientIp = ip.address();
  console.log(clientIp)
  const accessKey = 'e3ad3634-746c-4779-b322-b2c3660717b5';
  const url = `https://apiip.net/api/check?ip=${clientIp}&accessKey=${accessKey}`;

  try {
    // Make a request and store the response
    const response = await axios.get(url);
    console.log(ip)
    
    // Check if the response indicates an error
    if (response.data.success === false) {
      // If there's an error, log it and send a 400 status code
      console.error(`Error checking IP: ${JSON.stringify(response.data.message)}`);
      res.status(400).json({ error: response.data.message });
    } else {
      // If successful, log the currency code
      console.log(`Currency code for IP ${ip}: ${response.data.currency.code}`);
      res.json({ currencyCode: response.data.currency.code });
    }
  } catch (error) {
    // Log any network errors
    console.error('Network error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNIHG AT PORT 3000");
});