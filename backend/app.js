const express = require("express");
const db = require("./db/conn");
const router = require("./router/userrouter");
const cors = require("cors");
const PORT = 2500;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
