const express = require("express");
const bodyparser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("./documents");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/create-pdf", async (req, res) => {
  await pdfTemplate(req.body).then(res.send(true));
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/output.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
