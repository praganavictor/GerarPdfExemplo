const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const pdfTemplate = require("./documents/novo");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/create-pdf", async (req, res) => {
  await pdfTemplate(req.body)
    .then(res.send(true))
    .catch(err => console.log(err));
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/novopdf.pdf`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
