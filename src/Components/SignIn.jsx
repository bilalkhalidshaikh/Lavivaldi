import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Form, Image } from "react-bootstrap";
import logo from "../Images/logo.png";
import Hidden from "@material-ui/core/Hidden";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

function Copyright(props) {
  const link = window.location.href;
  return (
    <Typography align="center" {...props}>
      <Button
        variant="outlined"
        style={{ borderColor: "#ccc", color: "#ccc" }}
        size="large"
      >
        <Link href={link} to="/AdminContact" style={{ color: "#ccc" }}>
          lavivaldi.com
        </Link>
      </Button>
    </Typography>
  );
}

const openNotification = () => {
  notification.open({
    message: "We're Working on it",
    description:
      "ThisService is not Available right now soon we will update it...... Thanks.",
    icon: <SmileOutlined style={{ color: "#108ee9" }} />
  });
};

export default function SignIn() {
  const [email, setEmail] = React.useState(null);
  const [pass, setPass] = React.useState(null);
  console.log({
    email: email,
    password: pass
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    console.log({
      email: email,
      password: data.get("password")
    });
  };

  return (
    <div
      style={{ backgroundColor: "#020C24", overflow: "auto", height: "50em" }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "#020C24" }}
      >
        <CssBaseline />
        <CssBaseline />
        <CssBaseline />
        <br />
        <br />

        <Hidden only="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#ccc"
            }}
          >
            <Image src={logo} />
            <br />
            <br />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              style={{ padding: "10px 10px", textALign: "center" }}
            >
              {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            style={{color:"#ccc"}}
          /> */}
              <Form.Control
                type="email"
                placeholder="Email"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  color: "#ccc",
                  paddingBottom: "10px",
                  width: "25em"
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <br />
              <Form.Control
                type="password"
                placeholder="Password"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  color: "#ccc",
                  paddingBottom: "10px"
                }}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "rgba(196, 196, 196, 0.32)",
                  color: "#fff",
                  border: "0.2px solid #ccc"
                }}
                onClick={openNotification}
              >
                Accedi
              </Button>
              <br />
              <br />
              <Grid
                container
                style={{
                  color: "#ccc",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{
                      color: "#ccc",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                  >
                    Recupera password
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Hidden>

        <Hidden only="lg">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#ccc"
            }}
          >
            <Image src={logo} />
            <br />
            <br />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            style={{color:"#ccc"}}
          /> */}
              <Form.Control
                type="email"
                placeholder="Email"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  color: "#ccc",
                  paddingBottom: "10px",
                  width: "15em"
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <br />
              <Form.Control
                type="password"
                placeholder="Password"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  color: "#ccc",
                  paddingBottom: "10px"
                }}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
              {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  backgroundColor: "rgba(196, 196, 196, 0.32)",
                  color: "#fff",
                  border: "0.2px solid #ccc"
                }}
                onClick={openNotification}
              >
                <Link to="/Admin">Accedi</Link>
              </Button>
              <br />
              <br />
              <Grid
                container
                style={{
                  color: "#ccc",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ color: "#ccc" }}>
                    Recupera password
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Hidden>
        <br />
        <br />
        <br />
        <br />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}
