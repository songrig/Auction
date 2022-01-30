import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function SignInOrSignUp({setSignUP}) {
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
            setSignUP(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You Can't paertisipate auction beacus you dont have an acount"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={()=>{
              setSignUP(false)
              handleClose()
              navigate("/signInForBuyer")
          }}>SignIn</Button>
          <Button onClick={()=>{
              setSignUP(false)
              handleClose()
              navigate("/signUpForBuyer")
              }} autoFocus>
            SignUp
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}