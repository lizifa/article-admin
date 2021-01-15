const bodyParser = require("body-parser");
const express = require("express");
const app = express();
// const AccessControlAllowOrigin = "*";

// const AccessControlAllowHeaders = "Accept,Content-type,x-real-url";

// const AccessControlAllowMethods = "PUT,POST,GET,DELETE,OPTIONS";
// const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all("*", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:*");
  //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type,Access-Token");
  res.set("Access-Control-Expose-Headers", "*");
  next();
});

app.post("/update", function(req, res) {
  res.send(req.body);
});

app.post("/public", function(req, res) {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
