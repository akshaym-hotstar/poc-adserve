import "./App.css";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Card,
  CSSObject,
  FormControl,
  TextField,
  Theme,
  Tooltip,
  styled,
  useTheme,
  IconButton,
  ButtonGroup,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState<null>();
  const [startTime, setStartTime] = useState<null>();
  const [endDate, setEndDate] = useState<null>();
  const [endTime, setEndTime] = useState<null>();

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
      <Drawer variant="permanent" open={open}>
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
        <List>
          {[
            { Icon: HomeOutlinedIcon, Name: "Overview" },
            { Icon: SettingsOutlinedIcon, Name: "Campaigns" },
            { Icon: InsightsOutlinedIcon, Name: "Reports" },
            { Icon: AnalyticsIcon, Name: "Hotstar Pixel" },
            { Icon: ManageAccountsOutlinedIcon, Name: "Account" },
          ].map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    fontSize: "28px",
                  }}
                >
                  <item.Icon fontSize="inherit" />
                </ListItemIcon>
                <ListItemText
                  primary={item.Name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#efefef",
        }}
      >
        <DrawerHeader />
        <Box display="flex" columnGap={4}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              rowGap: "16px",
              flexGrow: 1,
            }}
          >
            <Typography variant="h5" fontWeight={500}>
              Edit Campaign
            </Typography>
            {/* Campaign Title card */}
            <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
              <Typography variant="h6">Campaign Title*</Typography>
              <Typography variant="caption">
                Select a Campaign Title that helps you identify and
                differentiate from others.
              </Typography>
              <TextField fullWidth margin="normal" />
            </Card>
            {/* Objective card */}
            <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={1}
              >
                <Typography variant="h6">Objective</Typography>
                <Tooltip title="More Information">
                  <InfoOutlinedIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <Typography variant="caption">
                Select a right objective for you campaign
              </Typography>
              <ButtonGroup
                variant="outlined"
                size="large"
                disableRipple
                disableElevation
                disableFocusRipple
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 2,
                }}
              >
                <Button endIcon={<InfoOutlinedIcon />} fullWidth>
                  Awareness
                </Button>
                <Button endIcon={<InfoOutlinedIcon />} fullWidth>
                  Consideration
                </Button>
                <Button endIcon={<InfoOutlinedIcon />} fullWidth>
                  Conversion
                </Button>
              </ButtonGroup>
            </Card>
            {/* Setup Campaign card */}
            <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={1}
              >
                <Typography variant="h6">Budget & Schedule</Typography>
                <Tooltip title="More Information">
                  <InfoOutlinedIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <hr />
              <FormControl sx={{ width: "500px" }} margin="normal">
                <TextField
                  variant="standard"
                  label="Pricing Model"
                  helperText="Pricing model is automatically selected based on you campaign goal"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl sx={{ width: "500px" }} required margin="normal">
                <TextField
                  required
                  type="number"
                  variant="standard"
                  label="Daily Budget"
                  helperText="Actual amount spent may vary"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ inputMode: "numeric" }}
                />
              </FormControl>
              <FormControl sx={{ width: "500px" }} required margin="normal">
                <TextField
                  required
                  type="number"
                  variant="standard"
                  label="Bid CPM"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ inputMode: "numeric" }}
                />
              </FormControl>
              <Box
                marginTop={1}
                display="flex"
                alignItems="center"
                columnGap={1}
                sx={{
                  background: "#fcf4eb",
                  borderRadius: "4px",
                  p: "8px",
                  width: "fit-content",
                }}
              >
                <ThumbUpOutlinedIcon htmlColor="#e69138" fontSize="medium" />
                <Typography variant="body1">
                  The best bid value on the platform is above 110. To outrank
                  your competition try a higher bid value.
                </Typography>
              </Box>
              <Typography variant="h6" marginTop={4}>
                Schedule Campaign*
              </Typography>
              <hr />
              <Box display="flex" flexDirection="column" rowGap={2} marginY={2}>
                <Typography variant="body1" fontWeight="500">
                  Campaign Start Date and Start Time
                </Typography>
                <Box display="flex" justifyContent="flex-start" columnGap={4}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{ width: "300px" }}
                      />
                    )}
                  />
                  <TimePicker
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" rowGap={2} marginY={2}>
                <Typography variant="body1" fontWeight="500">
                  Campaign End Date and End Time
                </Typography>
                <Box display="flex" justifyContent="flex-start" columnGap={4}>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{ width: "300px" }}
                      />
                    )}
                  />
                  <TimePicker
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </Box>
              </Box>
            </Card>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={2}
            padding={2}
            marginTop={4}
            height="fit-content"
            width="300px"
            borderRadius={1}
            sx={{ background: "#fff" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                Selected ad format:
              </Typography>
              <Typography fontSize={14}>Carousel Ad</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                Design recommendations:
              </Typography>
              <ul
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: "12px",
                  paddingLeft: "24px",
                }}
              >
                <li>File type: JPG or PNG or GIF</li>
                <li>Ratio: 1:1 (a square image)</li>
                <li>Resolution: 1000 x 1000 pixels</li>
              </ul>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                Technical specifications:
              </Typography>
              <ul
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: "12px",
                  paddingLeft: "24px",
                }}
              >
                <li>Width: 1000 pixels</li>
                <li>Height: 1000 pixels</li>
              </ul>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                Text recommendations:
              </Typography>
              <ul
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  fontSize: "12px",
                  paddingLeft: "24px",
                }}
              >
                <li>Caption: 50-60 characters</li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
