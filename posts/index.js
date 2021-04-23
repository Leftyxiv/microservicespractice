const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = nanoid();
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://events-srv:9005/events", {
    type: "PostCreated",
    data: posts[id],
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("received event", req.body.type);
  res.send({});
});

app.listen(9000, () => {
  console.log("LOVE LAUGH LIVE");
  console.log(`listening for posts on 9000`);
});
