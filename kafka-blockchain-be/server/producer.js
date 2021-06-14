const kafka = require('kafka-node');
const constants = require('./constants.js');
const client = new kafka.KafkaClient({kafkaHost: 'localhost:29092'});
const Producer = kafka.Producer;
const producer = new Producer(client);

var Web3 = require("web3");
const web3 = new Web3('ws://localhost:7545');
const PatentStore = require("../../smart-contracts/build/contracts/Patents.json");
var PatentContract;

// Get contract address and connect to the deployed contract
module.exports.initializeContract = async function () { 
  const networkId = await web3.eth.net.getId()
  const deployedAddress = PatentStore.networks[networkId].address
  PatentContract = new web3.eth.Contract(PatentStore.abi, deployedAddress);
}

// Publish new patent to topic and add it to the blockchain
module.exports.newPatent = function (patent) {
  const buffer = new Buffer.from(JSON.stringify(patent));
  publish(buffer, constants.UNVERIFIED_TOPIC);
  addToBlockchain(patent);
}

// Add patent to blockchain and once receipt is delivered, publish to second topic
async function addToBlockchain(patent) {
  PatentContract.methods
    .newPatent(patent.description)
    .send({ 
      from: patent.sender,
      gas: 6721975
    })
    .on('receipt', async function(receipt){
      const numPatents = await PatentContract.methods.numPatents.call().call();
      publish(numPatents-1, constants.VERIFIED_TOPIC)
    });
}

function publish(messages, topic) {
  const payload = [
    { topic: topic, messages: messages, partition: 0 }
  ];
  
  producer.send(payload, function(error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  });
}