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
var verified = [];

producer.initializeContract()

const Consumer = kafka.Consumer;
const consumer = new Consumer(
  client,
  [{ topic: 't1', partition: 0 }, { topic: 't2', partition: 0 }],
  { autoCommit: false }
);
    
consumer.on('message', function (message) {
  if(message.topic === "t2") {
    verified.push(true);
    patents.map((el, i) => el['verified'] = verified[i])
  } else {
    var decodedMessage = JSON.parse(message.value.toString());
    var patent = {
      description: decodedMessage.description,
      sender: decodedMessage.sender
    }
    patents.push(patent);
  }
});

app.post('/patent', (req, res) => {
  const patent = req.body;
  producer.newPatent(patent).then(() => {
    res.status(200).send('New patent added to blockchain');
  })
  .catch(err => {
    res.status(400).send('Failed to add patent.')
  });
});

app.get('/patents', function(req, res) {
  res.status(200).send(patents);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});