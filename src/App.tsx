import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./containers";
import { BookmarksPage, HomePage } from "./pages";
import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Sidebar></Sidebar>
        <div id="main-content">
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/bookmarks">
              <BookmarksPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
