const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("App is running");
});

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Hammer" },
    { id: 2, name: "Drill" }
  ]);
});

app.get("/api/error", (req, res) => {
  res.status(500).send("Internal error");
});

app.listen(3000, () => {
  console.log("Mock server running on http://localhost:3000");
});