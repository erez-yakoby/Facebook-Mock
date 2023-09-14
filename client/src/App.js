import { Box, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import { useCallback, useEffect, useState } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Authentication from "./pages/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [appTheme, setAppTheme] = useState("light");
  const [isUserLogged, setisUserLogged] = useState(true);

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
      {isUserLogged ? (
        <Box bgcolor={"background.default"} color={"text.primary"}>
          <NavBar />
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Home handleChangeTheme={handleChangeTheme} />}
              />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
          </Router>
        </Box>
      ) : (
        <Authentication />
      )}
    </ThemeProvider>
  );
}

export default App;
