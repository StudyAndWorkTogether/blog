import React, { useState, useEffect, useCallback } from 'react';
import db, {
  createPost,
  updatePost,
  deletePost,
} from './services';
import { useDropzone } from 'react-dropzone'
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  green: {
    color: 'black',
    margin: '0.5rem',
    background: '#adebad',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#00cc00',
    },
  },
  blue: {
    color: 'black',
    margin: '0.5rem',
    background: '#b6dfed',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#00bfff',
    },
  },
  yellow: {
    color: 'black',
    margin: '0.5rem',
    background: '#ffffbe',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ffff00',
    },
  },
  red: {
    color: 'black',
    margin: '0.5rem',
    background: '#ff9999',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#ff4d4d',
    },
  },
}));

function DialogComponent({ setPosts, open, handleClose }) {
  const classes = useStyles();
  const [id,setID] = useState()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setFiles(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  })

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleContent = (event) => {
    setContent(event.target.value)
  }

  const thumbs = previews.map(({name, preview}) => (
    <div key={name}>
      <img
        src={preview}
        alt={name}
        style={{width: '200px'}}
      />
    </div>
  ));

  useEffect(() => {
    setPreviews(files.map(file => {
      return {
        name: file.name,
        preview: URL.createObjectURL(file)
      };
    }))
  }, [files])

  // useEffect(() => {
  //   db.posts.toArray((data) => {
  //     setPosts(data)
  //   })
  // }, [])

  return (
    <div className="DialogComponent">
      <Dialog
        open={open}
        onClose={() => {
          handleClose()
          setTitle("")
          setContent("")
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Let's Do It</DialogTitle>
        <DialogContent>
          <Container>
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
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
            <aside>
              {thumbs}
            </aside>
          </Container>
        </DialogContent>
        <DialogActions>
          <div>
            <Button
              className={classes.green}
              variant="contained"
              onClick={() => {
                let flag = createPost(db.posts, {
                  title: title,
                  content: content,
                  files: files
                })
                setTitle("")
                setContent("")
                db.posts.toArray((data) => {
                  setPosts(data)
                })
                handleClose()
                console.log(flag)
              }}
            >
              create
            </Button>
            <Button
              className={classes.blue}
              variant="contained"
              onClick={() => {
                db.posts.toArray((data) => {
                  setPosts(data)
                })
                handleClose()
              }}
            >
              read
            </Button>
            <Button
              className={classes.yellow}
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
                handleClose()
              }}
            >
              update
            </Button>
            <Button
              className={classes.red}
              variant="contained"
              onClick={() => {
                deletePost()
                handleClose()
              }}
            >
              delete all
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogComponent;
