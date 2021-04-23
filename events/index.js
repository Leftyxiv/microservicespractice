const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://posts-clusterip-srv:9000/events', event)
  // axios.post('http://localhost:9001/events', event)
  // axios.post('http://localhost:9002/events', event)
  // axios.post('http://localhost:9003/events', event)

res.send({ status: 'ok' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(9005, () => {
  console.log('listening for events on 9005')
})