import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  makeStyles,
  Container
} from '@material-ui/core'
import './App.css';
import db, {
  createPost,
  readPosts,
  updatePost,
  deletePost,
 } from './services';

 const useStyles = makeStyles({
  green: {
    background: 'green',
    color: 'white',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#00cc00',
    },
  },
  blue: {
    background: 'blue',
    color: 'white',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#4d4dff',
    },
  },
  yellow: {
    background: 'yellow',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ffff80',
    },
  },
  red: {
    background: 'red',
    color: 'white',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ff4d4d',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
});

function App() {
  // const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }
  // useEffect(() => {
  //   (async() => {
  //     setPosts(await readPosts());
  //   })();
  // }, []);
  return (
    <div className="App">
      <h1>BLOGS</h1>
      <Container maxWidth="sm">
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="post-id">ID</InputLabel>
          <Input id="post-id" aria-describedby="id-helper-text" />
          <FormHelperText id="id-helper-text">This is the Post ID your will get</FormHelperText>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="post-title">Title</InputLabel>
          <Input id="post-title" aria-describedby="title-helper-text" onChange={handleTitle} value={title}/>
          <FormHelperText id="title-helper-text">Title is IMPORTANT!!</FormHelperText>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="post-content">Content</InputLabel>
          <Input id="post-content" aria-describedby="content-helper-text" onChange={handleContent} value={content}/>
          <FormHelperText id="content-helper-text">Ya...Tell Me About it ~</FormHelperText>
        </FormControl>
      </Container>
      <div>
        <Button
          classes={{
            root: classes.green,
            label: classes.label,
          }}
          variant="contained"
          onClick={(event) => {
            let flag = createPost(db.posts, {
              title: title,
              content: content
            })
            setTitle("")
            setContent("")
            console.log(flag)
          }}
        >
          create
        </Button>
        <Button
          classes={{
            root: classes.blue,
            label: classes.label,
          }}
          variant="contained"
          onClick={readPosts}
        >
          read
        </Button>
        <Button
          classes={{
            root: classes.yellow,
            label: classes.label,
          }}
          variant="contained"
          onClick={updatePost}
        >
          update
        </Button>
        <Button
          classes={{
            root: classes.red,
            label: classes.label,
          }}
          variant="contained"
          onClick={deletePost}
        >
          delete
        </Button>
      </div>
      {/* <div>{posts.length}</div> */}
    </div>
  );
}

export default App;
