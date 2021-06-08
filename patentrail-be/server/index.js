const patents = require('./patents.js');
const express = require("express");
const PatentStore = require("../build/contracts/Patents.json");

var Web3 = require("web3");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json())

const web3 = new Web3('ws://localhost:7545');
var PatentContract;

initializeContract()

async function initializeContract() { 
  const networkId = await web3.eth.net.getId()
  const deployedAddress = PatentStore.networks[networkId].address
  console.log(deployedAddress);
  PatentContract = new web3.eth.Contract(PatentStore.abi, deployedAddress);
}

async function getPatents() {
  const numPatents = await PatentContract.methods.numPatents.call().call();
  let patents = [];
  for (var i = 0; i < numPatents; i++) {
    const patent = await PatentContract.methods.patents(i).call();
    patents.push(patent);
  }
  return patents;
}

async function newPatent(patent) {
  PatentContract.methods
    .newPatent(patent.description)
    .send({ 
      from: patent.sender,
      gas: 6721975
    })
}

app.post('/patent', (req, res) => {
    const patent = req.body;
    console.log(patent);
    newPatent(patent).then(() => {
        res.status(200).send('New patent added to blockchain');
    })
    .catch(err => {
        res.status(400).send('Failed to add patent.')
    });
});

app.get('/patents', function(req, res) {
    getPatents()
      .then(patents => {
        res.status(200).send(patents);
      })
      .catch(err => {
        res.status(400).send('Failed to get patents.');
      });
  });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});