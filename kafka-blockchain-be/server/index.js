const express = require("express");
const kafka = require('kafka-node');
const producer = require('./producer.js');
const consumer = require('./consumer.js');
const constants = require('./constants.js');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json())

const client = new kafka.KafkaClient({kafkaHost: 'localhost:29092'});

const topicsToCreate = [
  {
    topic: constants.UNVERIFIED_TOPIC,
    partitions: 1,
    replicationFactor: 1
  },
  {
    topic: constants.VERIFIED_TOPIC,
    partitions: 1,
    replicationFactor: 1
  }
]

client.createTopics(topicsToCreate, (error, result) => {
  console.log('Created topics');
});

producer.initializeContract();

const offset = new kafka.Offset(client);

offset.fetch([
  { topic: constants.UNVERIFIED_TOPIC, parition: 0, time: -1, maxNum: 1 }
], function (err, data) {
  if (data && data[constants.UNVERIFIED_TOPIC][0] == 0) {
    producer.syncBlocks();
  }
})

consumer.start(client);

app.post('/patent', (req, res) => {
  const patent = req.body;
  producer.newPatent(patent);
});

app.get('/patents', function(req, res) {
  res.status(200).send(consumer.patents);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});