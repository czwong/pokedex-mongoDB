const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client/dist")));
app.use(router);

const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.log("Error Serving Server");
  } else {
    console.log("Serving on port", port);
  }
});
