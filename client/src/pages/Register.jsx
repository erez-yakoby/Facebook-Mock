import { Box, Button, Container, TextField, Link } from "@mui/material";
import React from "react";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userInfo = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(userInfo);
  };
  return (
    <>
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
              label="Password Confirmation"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
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
