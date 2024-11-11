import express from "express";
import axios from 'axios'
import IpAddr from 'ipaddr.js'
import ip from 'ip'
import fetch from "node-fetch";

const app = express();
const response = await fetch('https://api.ipify.org?format=json');
const data = await response.json();

app.use((req, res, next) => {
  req.clientIp = req.headers['x-forwarded-for'] || req.ip;
  next();
});

app.get("/", async (req, res) => {
  // Set endpoint and your access key
  const clientIp = req.clientIp;
    
  console.log(`Client IP: ${clientIp}`);

    // Example: Send request to check the client's public IP
  const response = await axios.get('https://api.ipify.org?format=json');
  const publicIp = response.data.ip;

  console.log(`Public IP: ${publicIp}`);

  res.send(`Client IP: ${clientIp}, Public IP: ${publicIp}`);
  const accessKey = '4501e4cb-328c-4255-9b49-4f6bfd8b930f';
  const url = `https://apiip.net/api/check?ip=${publicIp}&accessKey=${accessKey}`;

  const location = await fetch(url);

  // Decode JSON response:
  const result = await location.json();

  // Output the "code" value inside "currency" object
  console.log(result);
  });

app.listen(3000, () => {
  console.log("SERVER RUNNIHG AT PORT 3000");
});