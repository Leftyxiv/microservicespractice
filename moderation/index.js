const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());


app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated'){
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://events-srv:9005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    })
  }
  res.send({})
})


app.listen(9003, () => {
  console.log(`moderation service listening on 9003`)
})