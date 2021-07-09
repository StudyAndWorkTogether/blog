import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
} from '@material-ui/core'
import './App.css';
import db from './services';
import FabComponent from './FabComponent';
import CardComponent from './CardComponent'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.posts.toArray((data) => {
      setPosts(data)
    })
  }, [])

  return (
    <div className="App">
      <h1>BLOGS</h1>
      <FabComponent/>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {posts.map((post, index) =>
            <Grid item xs={3} key={index}>
              <CardComponent post={post}/>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
