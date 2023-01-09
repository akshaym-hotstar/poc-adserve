import "./App.css";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AppBar, Drawer, DrawerHeader } from "./components";
import { DrawerItems } from "./components/Drawer";

const drawerWidth = 240;

const drawerItems = [
  { Icon: HomeOutlinedIcon, Name: "Overview", Link: "/" },
  {
    Icon: SettingsOutlinedIcon,
    Name: "Campaigns",
    Link: "/campaigns",
  },
  { Icon: InsightsOutlinedIcon, Name: "Reports" },
  { Icon: AnalyticsIcon, Name: "Hotstar Pixel" },
  { Icon: ManageAccountsOutlinedIcon, Name: "Account" },
];

function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("/campaigns");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <CssBaseline enableColorScheme />
      <AppBar
        position="fixed"
        // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        drawerWidth={drawerWidth}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hotstar AdServe
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerItems isOpened={open} items={drawerItems} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#efefef",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <DrawerHeader />
        <Box display="flex" flexDirection="column" flex={1}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
