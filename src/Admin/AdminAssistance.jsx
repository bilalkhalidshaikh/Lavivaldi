import React from "react";
import Admin from "./Admin";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import CancelIcon from "@material-ui/icons/Cancel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Chat from "./Chat";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#020C24"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "#333",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    flex: 1,
    alignItems: "center !important",
    color: "#333",
    width: "10em",
    height: "5em",
    color: "#ccc",
    fontSize: "14px",
    marginLeft: "45em",
    backgroundColor: "#020C24"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Typography variant="h1" component="h1" */}
      <br />
      <Button
        onClick={handleClickOpen}
        variant="contained"
        className={classes.button}
      >
        ASSISTENZA
      </Button>
      {/* </Typography> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {/* <Link to={`/AdminContact`}> */}
              <CancelIcon />
              {/* </Link> */}
            </Button>
          </Toolbar>
        </AppBar>
        <Chat />
      </Dialog>
    </div>
  );
}

export default function AdminAssistance() {
  return (
    <div style={{ overflow: "hidden" }}>
      <Admin />
      <Chat />
    </div>
  );
}
