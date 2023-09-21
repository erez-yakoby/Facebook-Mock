import { Box, Button, Container, Grid, Link, TextField } from "@mui/material";
import React, { useContext } from "react";
import loginCall from "../utils/apiCalls";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userCredentials = {
      email: data.get("email"),
      password: data.get("password"),
    };
    loginCall(userCredentials, dispatch);
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

          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
