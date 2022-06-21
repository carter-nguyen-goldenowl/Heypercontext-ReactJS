import Login from "./components/frontend/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/frontend/auth/Register";
import Meeting from "./components/frontend/meeting/Meeting";
import Home from "./components/frontend/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Calendar from "./components/frontend/Calendar/Calendar";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          {isLogin === true ? (
            <>
              <Route path="/task" component={Home} />
              <Route path="/meeting" component={Meeting} />
              <Route path="/calendar" component={Calendar} />
            </>
          ) : (
            ""
          )}
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
