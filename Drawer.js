import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { setLiveDrow } from '../Redux/Slicder';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function TemporaryDrawer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [state, setState] = React.useState({
    left: false,
  });
  const isAuth = useSelector((state)=>state.auction.user.isAuth)
  const arrForUsers = ["Home Page",'My profile',"Live auction"]
  const arrForEvryone = ["Home Page","Live auction"]
  const arr1 = isAuth?arrForUsers:arrForEvryone

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, ["left"]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {arr1.map((text, index) => (
          <ListItem button key={text} onClick={()=>{
            if(text==="Home Page"){
              navigate("/")
            } else if (text==="My profile") {
              navigate("/myProfile")
            }
            else if (text==="Live auction") {
              navigate("/liveAuction")
            }
          }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {isAuth?["My Seler Page"].map((text, index) => (
          <ListItem button key={text} onClick={()=>{
            if(text==="My Seler Page"){
              dispatch(setLiveDrow({
                liveDrow:"MySelerPage"
              }))
              navigate("/mySelerPage")
            }
            
          }
            }>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )):null}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
            <MenuIcon  onClick={toggleDrawer("left", true)}/>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}