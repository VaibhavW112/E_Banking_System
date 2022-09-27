import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AuthenticationService from "../../service/AuthenticationService";

import Profile from "./Profile";
import CustomerTransactions from "./CustomerTransactions";
import MoneyTransfer from "./MoneyTransfer";
import AccountBalance from "./AccountBalance";
import RegisterComplaint from "./RegisterComplaint";
import ComplaintHistory from "./ComplaintHistory";
import ChangePassword from "./ChangePassword";

import Person4Icon from "@mui/icons-material/Person4";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import KeyIcon from "@mui/icons-material/Key";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [fragment, setfragment] = useState("PROFILE");

  const loadFragment = () => {
    switch (fragment) {
      case "PROFILE":
        return <Profile />;
      case "MONEY_TRANSFER":
        return <MoneyTransfer />;
      case "TX_HISTORY":
        return <CustomerTransactions />;
      case "CHANGE_PASSWORD":
        return <ChangePassword />;
      case "BALANCE_CHECK":
        return <AccountBalance />;
      case "COMPL_REG":
        return <RegisterComplaint />;
      case "COMPLAINT_HISTORY":
        return <ComplaintHistory />;
      default:
        break;
    }
  };

  const onLogout = () => {
    AuthenticationService.removeUserDetails();
    props.history.push("/");
  };

  // useEffect(() => {
  //   if(AuthenticationService.isUserLoggedIn !== true){
  //   props.history.push("/");
  //   alert("You Have To login first");
  //   }
  //  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className="App">
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Customer Home
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={(e) => setfragment("PROFILE")}>
            <ListItemIcon>
              <Person4Icon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("MONEY_TRANSFER")}>
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Money Transfer" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("TX_HISTORY")}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction History" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("BALANCE_CHECK")}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Check Balance" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("CHANGE_PASSWORD")}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("COMPL_REG")}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Register Complaint" />
          </ListItem>
          <ListItem button onClick={(e) => setfragment("COMPLAINT_HISTORY")}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Complaint History" />
          </ListItem>
          <ListItem button onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {loadFragment()}
      </main>
    </div>
  );
}
