const express = require("express");
const app = express();

require("dotenv").config();

let UpstoxClient = require("upstox-js-sdk");

let apiInstance = new UpstoxClient.LoginApi();
let apiVersion = "2.0";
let opts = {
  code: process.env.CODE,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  grantType: "authorization_code",
};
// console.log(opts);
const urlToFetchAccessCode = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${opts.clientId}&redirect_uri=${opts.redirectUri}`;

// console.log(urlToFetchAccessCode);

function getClientData() {
  apiInstance.token(apiVersion, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    }
  });
}

app.get("/callback", (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    return res.json({
      sucess: false,
      message: "Missing Code Query String !",
    });
  }
  opts.code = code;
  res.send(opts);
  getClientData();
  res.send("all good, output logged to console !");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port: ${process.env.PORT}`);
});
