import SideBar from "../components/SideBar";
import RightBar from "../components/RightBar";
import AddPost from "../components/AddPost";
import { Stack } from "@mui/material";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";

const Home = ({ handleChangeTheme }) => {
  return (
    <>
      <NavBar />
      <Stack
        className="App"
        direction="row"
        spacing={2}
        justifyContent="space-between"
        bgcolor="#f0f2f5"
      >
        <SideBar onClickChangeTheme={handleChangeTheme} showExpanded />

        <Feed />
        <RightBar />
      </Stack>
    </>
  );
};

export default Home;
