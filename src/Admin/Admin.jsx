import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import Contact from "./AdminContact";
import Assistance from "./AdminAssistance";
import Notification from "./AdminNotification";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import logo from "../Images/logo.png";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Page One" href="/drafts" />
        <LinkTab label="Page Two" href="/trash" />
        <LinkTab label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}

export default function Admin() {
  const home = window.location.href;
  let { path, url } = useRouteMatch();
  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#020C24" }}>
        <Container>
          <Navbar.Brand>
            <Link to="/Admin">
              <Image
                src={logo}
                style={{ width: "105px", height: " 18.64px" }}
              />
            </Link>
          </Navbar.Brand>
          &nbsp; &nbsp;
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", fontSize: "14pt" }}
              navbarScroll
            >
              <Nav.Link active>
                <Link to={`AdminDashboard`} style={{ color: "#ccc" }}>
                  DASHBOARD
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`AdminContact`} style={{ color: "#ccc" }}>
                  CONTATTI
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`AdminAssestance`} style={{ color: "#ccc" }}>
                  ASSISTENZA
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`AdminNotification`} style={{ color: "#ccc" }}>
                  NOTIFICHE
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
