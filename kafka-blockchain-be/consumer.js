const kafka = require('kafka-node');
const constants = require('./constants.js');

var patents = [];

module.exports.start = function (client) {
  const Consumer = kafka.Consumer;
  const consumer = new Consumer(
    client,
    [ { topic: constants.UNVERIFIED_TOPIC, partition: 0 }, 
      { topic: constants.VERIFIED_TOPIC, partition: 0 }],
    { autoCommit: false }
  );
    
  consumer.on('message', function (message) {
    if(message.topic === constants.VERIFIED_TOPIC) {
      patents[parseInt(message.value)].verified = true;
    } else {
      var decodedMessage = JSON.parse(message.value.toString());
      var patent = {
      id: decodedMessage.offset,
      description: decodedMessage.description,
      sender: decodedMessage.sender,
      verified: false
      }
      patents.push(patent);
    }
  });
}

exports.patents = patents;