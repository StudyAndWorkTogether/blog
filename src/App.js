import React from 'react';
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
import {
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
      backgroundColor: '#66ff66',
    },
  },
  blue: {
    background: 'blue',
    color: 'white',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#6666ff',
    },
  },
  yellow: {
    background: 'yellow',
    color: 'black',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ffff66',
    },
  },
  red: {
    background: 'red',
    color: 'white',
    margin: '0.5rem',
    '&:hover': {
      backgroundColor: '#ff6666',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
});

function App() {
  // const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const handleTitle = (event) => {
    console.log(event.target.value)
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
          <Input id="post-title" aria-describedby="title-helper-text" onChange={handleTitle}/>
          <FormHelperText id="title-helper-text">Title is IMPORTANT!!</FormHelperText>
        </FormControl>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="post-content">Content</InputLabel>
          <Input id="post-content" aria-describedby="content-helper-text" />
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
          onClick={createPost}
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
