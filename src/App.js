import React, { useState, useEffect } from 'react';
import {
  Button,
  makeStyles,
  Container,
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  // CardMedia
} from '@material-ui/core'
import './App.css';
import db from './services';
import DialogComponent from './DialogComponent'

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
    },
  },
  blue: {
    background: '#b6dfed',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#00bfff',
    },
  },
  yellow: {
    background: '#ffffbe',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ffff00',
    },
  },
  red: {
    background: '#ff9999',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ff4d4d',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
  fab: {
    backgroundColor: '#DD2E44',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#ff4d4d',
    },
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id,setID] = useState()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([])
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    db.posts.toArray((data) => {
      setPosts(data)
    })
  }, [])

  return (
    <div className="App">
      <h1>BLOGS</h1>
      <DialogComponent 
        setPosts={setPosts}
        open={open}
        setOpen={setOpen}
      />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {posts.map((post, index) =>
            <Grid item xs={3} key={index}>
              <Card className={classes.root}>
                {/* <CardMedia
                  component="img"
                  height="140"
                  image={post.files ? URL.createObjectURL(post.files[0]) : ""}
                /> */}
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
                    handleClickOpen()
                    db.posts.get(post.id, (data) => {
                      setID(data.id)
                      setTitle(data.title)
                      setContent(data.content)
                      setFiles(data.files)
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
