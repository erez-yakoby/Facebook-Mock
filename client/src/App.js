import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useContext, useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [appTheme, setAppTheme] = useState("light");
  const { user } = useContext(AuthContext);

  const curAppTheme = createTheme({
    palette: {
      mode: appTheme,
    },
  });

  const handleChangeTheme = () => {
    setAppTheme(appTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={curAppTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home handleChangeTheme={handleChangeTheme} />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route exact path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
