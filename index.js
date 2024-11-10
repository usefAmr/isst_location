import express from "express";
import axios from'axios';
import IpAddr from 'ipaddr.js'
import ip from 'ip'
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  // Set endpoint and your access key
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const clientIp = data.ip
  const accessKey = '4501e4cb-328c-4255-9b49-4f6bfd8b930f';
  const url = `https://apiip.net/api/check?ip=${clientIp}&accessKey=${accessKey}`;

  const location = await fetch(url);

  // Decode JSON response:
  const result = await location.json();

  // Output the "code" value inside "currency" object
  console.log(result);
  });

app.listen(3000, () => {
  console.log("SERVER RUNNIHG AT PORT 3000");
});