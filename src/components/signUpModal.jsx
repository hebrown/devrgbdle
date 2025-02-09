import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
import Typography from '@mui/material/Typography';
import { Auth } from "aws-amplify";
import { signIn } from "./signInModal";

async function signUp(email, password, username){
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {email}
    })

  } catch (error) {
    throw new Error(error)
  }
}

async function confirmSignUp(username, code){
  try{
    const user = await Auth.confirmSignUp(username, code)
  } catch(error) {
    throw new Error(error);
  }
}

export function SignUpModal(props){
  const [signUpFail, setSignUpFail] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userPass, setUserPass] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleConfirmUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    confirmSignUp(data.get('username'), data.get('confirmation'))
    .then(user => {
      props.close(true)
    })
    .then(user => signIn(data.get('username'), userPass))
    .catch(error => {
      setSignUpFail(true)
    })

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUserPass(data.get('password'));
    signUp(data.get('email'), data.get('password'), data.get('username'))
    .then(user => {
      setSignUpFail(false)
      setShowConfirm(true)
    })
    .catch(error => {
      setSignUpFail(true)
      setErrorMsg(error.message)
    })
  };
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
  };
  return (
    <div>
      {!showConfirm ? <div>
        {signUpFail && <Alert severity="error">{errorMsg}</Alert>}
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={signUpFail}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            error={signUpFail}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            error={signUpFail}
            margin="normal"
            required
            fullWidth
            name="username"
            label="User Name"
            id="username"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </div> :
      <Box component="form" onSubmit={handleConfirmUser} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">
          Check your email for the confirmation code
        </Typography>
        <TextField
          error={signUpFail}
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          name="username"
          autoFocus
        />
        <TextField
          error={signUpFail}
          margin="normal"
          required
          fullWidth
          id="confirmation"
          label="Confirmation Code"
          name="confirmation"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirm Sign In
        </Button>
      </Box>
      }
    </div>
  )
}