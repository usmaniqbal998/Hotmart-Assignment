import { Box } from "@mui/system";
import React from "react";
import Main from "./components/main.jsx";
import SideBar from "./components/sidebar.jsx";

const drawerWidth = 220;

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar drawerWidth={drawerWidth} />
      <Main drawerWidth={drawerWidth} />
    </Box>
  );
}

export default App;
