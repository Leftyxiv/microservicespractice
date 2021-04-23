const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = nanoid();
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: req.params.id, content, status: "pending..." });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://events-srv:9005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(commentsByPostId[req.params.id]);
});

app.post("/events", async (req, res) => {
  console.log("received event", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];

    // const comment = comments.find((comment) => {
    //   return id === comment.id;
    // });
    // console.log(postId, id, status, content, comments);
    comments[0].status = status;

    await axios.post("http://events-srv:9005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(9001, () => {
  console.log(`listening for comments on 9001`);
});
