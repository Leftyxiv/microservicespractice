import React, { useState } from "react";
import axios from 'axios'


const PostCreate = () => {
  const [input, setInput] = useState('')
  
  const onSubmit = async (evt) => {
    evt.preventDefault();

    await axios.post('http://localhost:9000/posts', {
      title: input
    });
    setInput('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>{input}</label>
          <input value={input} onChange={(event) => setInput(event.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
