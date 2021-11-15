import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import Products from "./Products";

const Main = ({ children, drawerWidth }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </Box>
  );
};

export default Main;
