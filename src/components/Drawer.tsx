import {
  CSSObject,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIconProps,
  Theme,
} from "@mui/material";
import { ElementType } from "react";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface DrawerProps extends MuiDrawerProps {
  drawerWidth: number;
}

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
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

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<DrawerProps>(({ theme, open, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface DrawerItemsProps {
  /** Drawer open/close state */
  isOpened: boolean;
  items: {
    Name: string;
    Icon: ElementType<SvgIconProps>;
    Link?: string;
  }[];
}

export const DrawerItems = ({
  isOpened,
  items,
}: PropsWithChildren<DrawerItemsProps>) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.Name}
          component={Link}
          to={item.Link}
          sx={{
            display: "flex",
            minHeight: 48,
            justifyContent: isOpened ? "initial" : "center",
            px: 2.5,
            flexFlow: isOpened ? "row" : "column",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpened ? 3 : 0,
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            <item.Icon fontSize="inherit" />
          </ListItemIcon>
          <ListItemText
            primary={item.Name}
            primaryTypographyProps={{
              ...(!isOpened ? { fontSize: "10px" } : null),
              color: "black"
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
