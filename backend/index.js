const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const port = 5000;

var cors = require("cors");
var app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`INotBokk backend listening on port ${port}`);
});
