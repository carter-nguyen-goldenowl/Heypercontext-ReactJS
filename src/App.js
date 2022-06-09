import Login from "./components/frontend/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/frontend/auth/Register";
import Meeting from "./components/frontend/meeting/Meeting";
import Home from "./components/frontend/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/meeting" component={Meeting} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
