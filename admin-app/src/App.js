import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

import "./App.css";
import checkToken from "./utils/CheckToken";
import HomePage from "./components/home/page";
import LoginPage from "./components/login/page";
import SignUpPage from "./components/signup/page";
import ChatPage from "./components/chat/page";
import ClubManagePage from './components/club_manage/page'
import UserManagePage from "./components/user_manage/page";
import { PrivateRoute } from "./PrivateRoute";
function App() {
  return (
    <div className="App">
      <Route exact path="/">
        {localStorage.getItem("access_token") ? (
          <HomePage></HomePage>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/group/*" component={ChatPage}></Route>
      <Route exact path="/user_manage" component={UserManagePage} />
      <Route exact path="/club_manage" component={ClubManagePage} />
      <PrivateRoute path="/home" component={HomePage} />
      {/* <Route exact path="*" component={() => '404 NOT FOUND'} /> */}
    </div>
  );
}

export default App;
