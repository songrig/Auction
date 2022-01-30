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
import { getAuth, createUserWithEmailAndPassword,  } from "firebase/auth"
import { addBuyer, createUserForBuyer, } from "../firebais/fiarebaisForBuyers"
import { useNavigate } from "react-router-dom"

import { setUser } from "../Redux/Slicder"
import { useDispatch, useSelector } from "react-redux"

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

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auction.user.isAuth)
  const[userError,setUserError] = React.useState({
    email: true,
      password: true,
      name: true,
      surName: true,
  })


  const auth = getAuth()

  if (isAuth) {
    navigate("/")
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    const user = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("firstName"),
      surName: data.get("lastName"),
    }
    if(!user.name || !user.surName){
      setUserError(
        user
      )
      return
    }
     await createUserWithEmailAndPassword(auth, user?.email, user?.password)
    .then(async(userCredential) => {
      // Signed in
      console.log(user)
      await addBuyer(user.name, user.surName, user.email,)

   
      dispatch(setUser({
        payload: {
          name: user.name,
          surName: user.surName,
          email: user.email,
          //  id:currenntUser.id,
          balance: 100000,
          isAuth: true
        }
      }))
      


      navigate("/")

      // ...
    })
    .catch((error) => {
      console.log(user)
      console.log(error.message)
      if(error.message == "Firebase: Error (auth/invalid-email)." && user.password.length >= 6 ){
        setUserError({
          ...user,
          email:false
        })
      }else if(error.message == "Firebase: Error (auth/invalid-email)." && user.password.length < 6){
        setUserError({
          ...user,
          email:false,
          password:false,
        })
      }else if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        setUserError({
          ...user,
          password:false
        })
      }
      else{
        setUserError(user)
      }
      
      // if(error.message == "Firebase: Error (auth/internal-error)."){
      
      //   setUserError({
      //     email:true,
      //     name:true,
      //     surname:true
      //   })
      // }
      //  if(!user.password || error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
        
      //   setUserError({
      //     ...userError,
      //    password:true
      //   })
      // }
     
      console.log(user.password)

      const errorCode = error.code
      const errorMessage = error.message
      
      // ..
    })
   

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                error={userError.name?false:true}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                error={userError.surName?false:true}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={userError.email?false:true}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={userError.password?false:true}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signInForBuyer" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
