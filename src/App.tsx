import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { BookmarkedCommentWatcherContainer, Sidebar } from "./containers";
import { BookmarksPage, HomePage, NotificationsPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <BookmarkedCommentWatcherContainer />
      <Sidebar></Sidebar>
      <div id="main-content">
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/bookmarks">
            <BookmarksPage />
          </Route>
          <Route path="/notifications">
            <NotificationsPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
