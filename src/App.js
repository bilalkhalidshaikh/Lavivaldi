import "./App.css";
import { SignIn } from "./Components";
import {
  Admin,
  AdminContact,
  AdminAssestance,
  AdminDashboard,
  AdminNotification
} from "./Admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import "node_modules/video-react/dist/video-react.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/Admin" component={Admin} />
          <Route path="/AdminContact" component={AdminContact} />
          <Route path="/AdminAssestance" component={AdminAssestance} />
          <Route path="/AdminDashboard" component={AdminDashboard} />
          <Route path="/AdminNotification" component={AdminNotification} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
