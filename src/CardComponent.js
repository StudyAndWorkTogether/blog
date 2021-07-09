import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core'
import db from './services';
import DialogComponent from './DialogComponent';

function CardComponent({ post }) {
	const [open, setOpen] = useState(false);
  const [id,setID] = useState()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState([])
  const [files, setFiles] = useState([]);
  // const [previews, setPreviews] = useState([])
	
	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<div className="CardComponent">
			<Card>
				{/*
				className={classes.root}
				<CardMedia
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
			<DialogComponent open={open} handleClose={handleClose}/>
		</div>
	)
}	

export default CardComponent