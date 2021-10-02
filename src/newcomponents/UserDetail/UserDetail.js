import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Tabs } from "antd";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import "react-pro-sidebar/dist/css/styles.css";
import { ChatContext } from "../../contexts/ChatContext";
import Grid from "@material-ui/core/Grid";
import { UserOutlined } from "@ant-design/icons";

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function FullWidthGrid() {
  const classes = useStylesGrid();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
function FullWidthGridTwo() {
  const classes = useStylesGrid();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStylesChip = makeStyles((theme) => ({
  root: {
    "display": "flex",
    "justifyContent": "center",
    "color": "#ccc",
    "flexWrap": "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

function OutlinedChips() {
  const classes = useStylesChip();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div className={classes.root}>
      <Chip label="Basic" variant="outlined" color="primary" />
      <Chip label="Disabled" disabled variant="outlined" color="primary" />
      <Chip
        avatar={<Avatar>M</Avatar>}
        label="Clickable"
        onClick={handleClick}
        variant="outlined"
        color="primary"
      />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable"
        onDelete={handleDelete}
        variant="outlined"
        color="primary"
      />
      <Chip
        icon={<FaceIcon />}
        label="Clickable deletable"
        onClick={handleClick}
        color="primary"
        onDelete={handleDelete}
        variant="outlined"
      />
      <Chip
        label="Custom delete icon"
        onClick={handleClick}
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
        color="primary"
      />
      <Chip
        label="Clickable link"
        component="a"
        href="#chip"
        clickable
        variant="outlined"
        color="primary"
      />
      <Chip
        avatar={<Avatar>M</Avatar>}
        label="Primary clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Primary clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        label="Deletable primary"
        onDelete={handleDelete}
        color="primary"
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Deletable secondary"
        onDelete={handleDelete}
        color="secondary"
        variant="outlined"
      />
    </div>
  );
}

const useStylesPaper = makeStyles((theme) => ({
  root: {
    "display": "flex",
    "flexWrap": "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

function SimplePaper() {
  const classes = useStylesPaper();

  return (
    <div className={classes.root}>
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </div>
  );
}

const useStylesCard = makeStyles({
  root: {
    minWidth: 285,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020C24",
    color: "#ccc"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "44px",
    color: "#ccc"
  },
  pos: {
    marginBottom: 12
  },
  avatar: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Demo = () => (
  <Tabs
    defaultActiveKey="1"
    onChange={callback}
    style={{
      backgroundColor: "transparent",
      color: "#ccc",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <TabPane tab="Media" key="1">
      <FullWidthGrid />
    </TabPane>
    <TabPane tab="ALLENAMENTI" key="2">
      <FullWidthGridTwo />
    </TabPane>
  </Tabs>
);

function SimpleCard({ name }) {
  const classes = useStylesCard();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {!name ? <h1 className={classes.title}>Name</h1> : name.name}
        </Typography>
        <Avatar className={classes.avatar}>
          <UserOutlined />
        </Avatar>
        <br />
        <Demo />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function UserDetail() {
  const { selectedChat } = useContext(ChatContext);
  return <SimpleCard name={selectedChat} />;
}
