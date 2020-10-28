import React from "react";
import "./app.scss";
import { Content } from "carbon-components-react";
import AppHeader from "./components/AppHeader";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./content/LandingPage";
import ExplorePage from "./content/ExplorePage";

function App() {
  return (
    <>
      <AppHeader />
      <Content className="content">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/explore" component={ExplorePage} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
