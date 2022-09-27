import React, { useEffect, useState } from "react";
import HeaderComponent from "./component/HeaderComponent";
import Welcome from "./component/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./component/Admin/AdminLogin";
import CreateAccount from "./component/CreateAccount";
import OpenAnotherAccount from "./component/OpenAnotherAccount";
import AdminHome from "./component/Admin/AdminHome";
import CustomerHome from "./component/Customer/CustomerHome";
import ContactUs from "./component/ContactUs";
import "./App.css";

import { Switch, Route } from "react-router";
import AuthenticationService from "./service/AuthenticationService";
import ForgotPassword from "./component/ForgotPassword";
import UploadImage from "./component/UploadImage";
export const AuthContext = React.createContext(null);
function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    console.log("SOMETHING CHANGES");
  }, [AuthenticationService.isUserLoggedIn()]);
  return (
    <>
      <Switch>
        <Route exact path="/adminlogin" component={AdminLogin}></Route>
        <Route exact path="/createaccount" component={CreateAccount}></Route>
        <Route exact path="/uploadimage" component={UploadImage}></Route>
        <Route
          exact
          path="/openanotheraccount"
          component={OpenAnotherAccount}
        ></Route>
        <Route exact path="/adminhome" component={AdminHome}></Route>
        <Route exact path="/customerhome" component={CustomerHome}></Route>
        <Route exact path="/contact" component={ContactUs}></Route>
        <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
        <Route exact path="/" component={Welcome}></Route>
      </Switch>
    </>
  );
}

export default App;
