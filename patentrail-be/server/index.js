const patents = require('./patents.js');
const express = require("express");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json())

patents.initializeContract()

app.post('/patent', (req, res) => {
    const patent = req.body;
    console.log(patent);
    patents.newPatent(patent).then(() => {
        res.status(200).send('New patent added to blockchain');
    })
    .catch(err => {
        res.status(400).send('Failed to add patent.')
    });
});

app.get('/patents', function(req, res) {
    patents.getPatents()
      .then(patents => {
        res.status(200).send(patents);
      })
      .catch(err => {
        res.status(400).send('Failed to get patents.');
      });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});