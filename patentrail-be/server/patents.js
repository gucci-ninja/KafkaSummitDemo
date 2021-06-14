const PatentStore = require("../../smart-contracts/build/contracts/Patents.json");
var Web3 = require("web3");

const web3 = new Web3('ws://localhost:7545');
var PatentContract;

module.exports.initializeContract = async function () { 
  const networkId = await web3.eth.net.getId()
  const deployedAddress = PatentStore.networks[networkId].address
  console.log("Contract address: ", deployedAddress);
  PatentContract = new web3.eth.Contract(PatentStore.abi, deployedAddress);
}

module.exports.getPatents = async function () {
  const numPatents = await PatentContract.methods.numPatents.call().call();
  let patents = [];
  for (var i = 0; i < numPatents; i++) {
    const patent = await PatentContract.methods.patents(i).call();
    patents.push(patent);
  }
  return patents;
}

module.exports.newPatent = async function (patent) {
    PatentContract.methods
    .newPatent(patent.description)
    .send({ 
      from: patent.sender,
      gas: 6721975
    })
    .on('receipt', function(){
        console.log('Patent added to blockchain')
    });
}