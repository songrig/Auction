import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

export default function SuccessUpload({setErrorItems,setItem}) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog
        open={open}
        onClose={()=>{
            handleClose()
            setItem({})
            setErrorItems({})
            navigate("/myProfile")
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You add successfully your item "}
          <Alert variant="filled" severity="success" >
                    This is a success alert — check it out!
                </Alert> 
        </DialogTitle>

        <DialogActions>
          <Button onClick={()=>{
              handleClose()
              setItem({})
              setErrorItems({})
              navigate("/myProfile")
          }}>My Profile</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}