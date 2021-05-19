import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  makeStyles,
  Container,
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions
} from '@material-ui/core'
import './App.css';
import db, {
  createPost,
  updatePost,
  deletePost,
 } from './services';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  green: {
    background: '#adebad',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#00cc00',
      fontWeight: 'bold'
    },
  },
  blue: {
    background: '#b6dfed',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#00bfff',
      fontWeight: 'bold'
    },
  },
  yellow: {
    background: '#ffffbe',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ffff00',
      fontWeight: 'bold'
    },
  },
  red: {
    background: '#ff9999',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ff4d4d',
      fontWeight: 'bold'
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}));

function App() {
  const classes = useStyles();
  const [id, setID] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  useEffect(() => {
    db.posts.toArray((data) => {
      setPosts(data)
      if(data.length) {
        setID(data[data.length - 1].id + 1)
      } else {
        setID(1)
      }
    })
  }, []);

  return (
    <div className="App">
      <h1>BLOGS</h1>
      <Container maxWidth="sm">
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="post-id">ID</InputLabel>
          <Input id="post-id" aria-describedby="id-helper-text" value={id} readOnly={true}/>
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
          onClick={() => {
            let flag = createPost(db.posts, {
              title: title,
              content: content
            })
            setTitle("")
            setContent("")
            db.posts.toArray((data) => {
              // setPosts(data)
              setID(data[data.length - 1].id + 1)
            })
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
          onClick={() => {
            db.posts.toArray((data) => {
              setPosts(data)
            })
          }}
        >
          read
        </Button>
        <Button
          classes={{
            root: classes.yellow,
            label: classes.label,
          }}
          variant="contained"
          onClick={() => {
            updatePost(db.posts, {
              id,
              title,
              content
            })
            setTitle("")
            setContent("")
            db.posts.toArray((data) => {
              setID(data[data.length - 1].id + 1)
            })
          }}
        >
          update
        </Button>
        <Button
          classes={{
            root: classes.red,
            label: classes.label,
          }}
          variant="contained"
          onClick={() => deletePost()}
        >
          delete
        </Button>
      </div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {posts.map((post, index) =>
            <Grid item xs={3} key={index}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {
                    db.posts.get(post.id, (data) => {
                      setID(data.id)
                      setTitle(data.title)
                      setContent(data.content)
                    })
                  }}>
                    Edit
                  </Button>
                  <Button size="small" onClick={() => {
                    db.posts.delete(post.id)
                    db.posts.toArray((data) => {
                      setPosts(data)
                    })
                  }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
