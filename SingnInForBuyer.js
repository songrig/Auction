import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux"
import {  setUser } from "../Redux/Slicder"
import { useNavigate } from "react-router-dom"
import { db, getUsers } from "../firebais/fiarebaisForBuyers"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignIn() {

  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector((state)=>state.auction.user.isAuth)
  const[errForUser,seterrorForUsr] = React.useState({})

  if(isAuth){
    navigate("/")
  }

  const signIn = async(email,password) => {
    
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const cuerrenUser = userCredential.user;

      const ourusersInfo = () => getUsers(db);
      const asd = ourusersInfo();
      asd.then(function (resolve) {
        const usersInfo = resolve;
        const user = usersInfo.find((userInfo) => userInfo.email === email);
        dispatch(setUser(
          {
            payload:{
              balanse:100000,
              name:user.name,
              surName:user.Surname,
              email:cuerrenUser.id,
              uid:cuerrenUser.id,
              isAuth:true,
              referance:user.referance
            }
          }
        ))
      })
      

      

      navigate("/")
      
      // ...
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if(errorMessage == "Firebase: Error (auth/invalid-email)." || errorMessage == "Firebase: Error (auth/user-not-found)."){
        seterrorForUsr({
          user:true,
        })
      }else if("Firebase: Error (auth/wrong-password)."){
        seterrorForUsr({
          password:true
        })
      }
    });

  }

  







  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    }
    
    signIn(user.email,user.password)


  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={errForUser.user?true:false}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
            error={errForUser.password?true:false}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
