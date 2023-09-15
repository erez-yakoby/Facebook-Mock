import SideBar from "../components/SideBar";
import RightBar from "../components/RightBar";
import AddPost from "../components/AddPost";
import { Stack } from "@mui/material";
import Feed from "../components/Feed";

const Home = ({ handleChangeTheme }) => {
  return (
    <>
      <Stack
        className="App"
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <SideBar onClickChangeTheme={handleChangeTheme} showExpanded />
        <Feed />
        <RightBar />
      </Stack>
      <AddPost />
    </>
  );
};

export default Home;
