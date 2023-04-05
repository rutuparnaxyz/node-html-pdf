const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/generate-pdf', (req, res) => {
  const html = req.body.html;

  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while generating the PDF');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=generated-pdf.pdf');
      res.send(buffer);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
