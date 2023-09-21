import { Box, Button, Container, TextField, Link } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userInfo = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirmation: data.get("passwordConfirmation"),
    };
    setPasswordsMatch(userInfo.password === userInfo.passwordConfirmation);

    await axios
      .post(`${SERVER_URL}/api/auth/register`, userInfo)
      .then((response) => {
        setRegistered(true);
      })
      .catch((error) => {
        // TODO: hide error data
        console.log(error);
      });
  };
  return (
    <>
      {registered && <Navigate to="/login" />}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            size="large"
            disableFocusRipple
            disableRipple
            disableTouchRipple
            disableElevation
            sx={{ py: 4, fontSize: 50, borderRadius: 3 }}
          >
            Facebook
          </Button>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="User Name"
              id="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label={
                passwordsMatch
                  ? "Password Confirmation"
                  : "Passwords don't match"
              }
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
              error={!passwordsMatch}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
