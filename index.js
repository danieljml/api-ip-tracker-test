const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Welcome</h1>");
});

app.get("/:ip", async (request, response) => {
  const { ip } = request.params;

  if (request.url === "/favicon.ico") {
    response.writeHead(200, { "Content-Type": "image/x-icon" });
    response.end();
    console.log("favicon requested");
    return;
  }

  const ipTrackerUrl = `http://ipinfo.io/${ip}?token=f7e68a41baa7e5`;
  const ipTrackerResponse = (await axios.get(ipTrackerUrl)).data;
  response.json(ipTrackerResponse);
});

app.listen(8080, () => {
  console.log("🚀  server started");
});
