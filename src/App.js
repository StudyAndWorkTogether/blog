import React, { useEffect, useState } from 'react';
import './App.css';
import {
  // createPost,
  // updatePost,
  // deletePost,
  // getPost,
  listPosts,
 } from './services';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async() => {
      setPosts(await listPosts());
    })();
  }, []);

  return (
    <div className="App">
      <h1>Let's Get Start!</h1>
      {posts.length}
    </div>
  );
}

export default App;
