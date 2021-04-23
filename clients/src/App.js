import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <h1 style={{ color: "rebeccapurple" }}>Create Post</h1>
      <PostCreate />
      <hr />
      <h1 style={{ color: "rebeccapurple" }}>Post List</h1>
      <PostList />
    </div>
  );
};

export default App;
