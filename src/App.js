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
 import Dialog from '@material-ui/core/Dialog';
 import DialogActions from '@material-ui/core/DialogActions';
 import DialogContent from '@material-ui/core/DialogContent';
 import DialogContentText from '@material-ui/core/DialogContentText';
 import DialogTitle from '@material-ui/core/DialogTitle';
 import TextField from '@material-ui/core/TextField';
 import Fab from '@material-ui/core/Fab';
 import AddIcon from '@material-ui/icons/Add';
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
  const [id,setID] = useState()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  useEffect(() => {
    db.posts.toArray((data) => {
      setPosts(data)
    })
  }, []);

  return (
    <div className="App">
      <h1>BLOGS</h1>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm">
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
              setPosts(data)
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
            setID()
            setTitle("")
            setContent("")
            db.posts.toArray((data) => {
              setPosts(data)
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
          delete all
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
                    setID()
                    setTitle("")
                    setContent("")
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
