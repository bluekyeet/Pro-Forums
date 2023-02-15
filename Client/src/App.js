// React - Frontend

import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [TitleLength, setTitleLength] = useState(0);
  const handleTitleChange = (e) => {
    if (e.target.value.length <= 40) {
      setTitle(e.target.value);
      setTitleLength(e.target.value.length);
    }
  };
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [bodyLength, setBodyLength] = useState(0);

  const handleBodyChange = (e) => {
    if (e.target.value.length <= 1000) {
      setBody(e.target.value);
      setBodyLength(e.target.value.length);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://BackEnd.bluekyeetyt.repl.co/posts");
      const data = await res.json();
      setPosts(data.reverse());
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://BackEnd.bluekyeetyt.repl.co/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        author,
      }),
    });
    const post = await res.json();
    setPosts([post, ...posts]);
    setTitle("");
    setBody("");
    setAuthor("");
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "20px" }}>
        <h1>Pro Forums</h1>
      </div>
      <div style={{ flex: 2, paddingTop: "20px" }}>
        {posts.map((post) => (
          <div key={post.title} style={{ marginBottom: "20px", background: "#F0F0F0", padding: "20px" }}>
            <h3 style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{post.title}</h3>
            <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{post.body}</p>
            <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>By Anonymous</p>
          </div>
        ))}
      </div>
      <div style={{ flex: 0.1, padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <h3>Create a new post</h3>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            maxLength={40}
            required
          />
          <p>{TitleLength}/40 Title characters</p>
          <textarea
            placeholder="Body"
            value={body}
            onChange={handleBodyChange}
            maxLength={1000}
            style={{ marginTop: "10px" }}
            required
          />
          <p style={{ marginTop: "10px" }}>{bodyLength}/1000 characters</p>
          <button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;