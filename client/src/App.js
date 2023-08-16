import { Box, ThemeProvider, createTheme } from "@mui/material";
import NavBar from "./components/NavBar";
import { useCallback, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import axios from "axios";

const options = {
  method: "GET",
  url: "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile",
  params: {
    ig: "fairytalefolkdorset",
    response_type: "short",
    corsEnabled: "false",
  },
  headers: {
    "X-RapidAPI-Key": "23ed13e490msha03a66fbdf4a049p1d739ejsn586c09d0a05a",
    "X-RapidAPI-Host": "instagram-bulk-profile-scrapper.p.rapidapi.com",
  },
};

function App() {
  const baseURL = "http://localhost:3080";
  // const getPosts = useCallback(() => {
  //   axios
  //     .get(options)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  const getPosts = useCallback(() => {
    axios
      .get(
        "https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [appTheme, setAppTheme] = useState("light");

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
        <NavBar />
        <Router>
          <Routes>
            <Route path="/" element={<Home handleChangeTheme={getPosts} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
