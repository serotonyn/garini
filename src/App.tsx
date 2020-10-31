import React from "react";
import "./app.scss";
import { Content } from "carbon-components-react";
import AppHeader from "./components/AppHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "./content/LandingPage";
import ExplorePage from "./content/ExplorePage";
import ReceptionistPage from "./content/ReceptionistPage";
import MyParkingPage from "./content/MyParkingPage";
import CreateParkingPage from "./content/CreateParkingPage";

export enum User {
  Automobilist,
  Receptionist,
  Guest,
}

const RootRoute = ({ user, ...args }: any) => {
  let component;
  switch (user) {
    case User.Receptionist:
      component = () => <ReceptionistPage />;
      break;
    case User.Automobilist:
      component = () => <div>Automobilist</div>;
      break;
    default:
      component = () => <LandingPage />;
  }
  return <Route {...args} component={component} />;
};

const AuthRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

const user: User = User.Receptionist;
const hasReceptionistParking = false;
function App() {
  return (
    <>
      <AppHeader user={user} hasReceptionistParking={hasReceptionistParking} />
      <Content className="content">
        <Switch>
          <RootRoute user={user} exact path="/" />
          <AuthRoute
            exact
            path="/my-parking"
            isAuthenticated={user === User.Receptionist}
            component={() => (
              <MyParkingPage hasReceptionistParking={hasReceptionistParking} />
            )}
          />
          <AuthRoute
            exact
            path="/create"
            component={CreateParkingPage}
            isAuthenticated={user === User.Receptionist}
          />
          <Route exact path="/explore" component={ExplorePage} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
