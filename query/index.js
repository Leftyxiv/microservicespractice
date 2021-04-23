const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }
  } 
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId]
    post.comments.push({ id, content, status })
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId]
    const comment = post.comments.find((comment) => comment.id === id)
    comment.status = status;
    comment.content = content;
  }

}

app.get('/posts', (req, res) => {
  res.send(posts);
})

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({});
})

app.listen(9002, async ()=> {
  console.log('query listening on 9002')

  const res = await axios.get('http://events-srv:9005/events');
  for (let event of res.data){
    console.log('processing event', event.type)
    handleEvent(event.type, event.data);
  }
})