const express = require("express");
const kafka = require('kafka-node');
const producer = require('./producer.js');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json())

const client = new kafka.KafkaClient({kafkaHost: 'localhost:29092'});

const topicsToCreate = [
  {
    topic: 't1',
    partitions: 1,
    replicationFactor: 1
  },
  {
    topic: 't2',
    partitions: 1,
    replicationFactor: 1
  }
]

client.createTopics(topicsToCreate, (error, result) => {
  console.log('Created topics')
});

var patents = [];

producer.initializeContract()
const offset = new kafka.Offset(client);

offset.fetch([
  { topic: 't1', partition: 0, time: -1, maxNum: 1 }
], function (err, data) {
  if (data && data['t1'][0] == 0) {
    producer.syncBlocks();
  }
});

const Consumer = kafka.Consumer;
const consumer = new Consumer(
  client,
  [{ topic: 't1', partition: 0 }, { topic: 't2', partition: 0 }],
  { autoCommit: false }
);
    
consumer.on('message', function (message) {
  if(message.topic === "t2") {
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

app.post('/patent', (req, res) => {
  const patent = req.body;
  producer.newPatent(patent);
});

app.get('/patents', function(req, res) {
  res.status(200).send(patents);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});