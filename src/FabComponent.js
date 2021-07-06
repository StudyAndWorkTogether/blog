import React, { useState } from 'react'
import {
  Fab,
  makeStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import DialogComponent from './DialogComponent';


const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: '#DD2E44',
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    '&:hover': {
      backgroundColor: '#ff4d4d',
    },
  }
}));

function FabComponent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="FabComponent">
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} classes={{
        root: classes.fab,
      }}>
        <AddIcon />
      </Fab>
      <DialogComponent open={open} handleClose={handleClose}/>
    </div>
  )
}

export default FabComponent