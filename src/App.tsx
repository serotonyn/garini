import React from "react";
import "./app.scss";
import { Content } from "carbon-components-react";
import AppHeader from "./components/AppHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "./content/LandingPage";
import ExplorePage from "./content/ExplorePage";
import ReceptionistPage from "./content/ReceptionistPage";
import CreateParkingPage from "./content/CreateParkingPage";
import NoMatch from "./components/NoMatch";
import SignupPage from "./content/SignupPage";
import LoginPage from "./content/LoginPage";

export enum User {
  Automobilist,
  Receptionist,
  Guest,
}

const RootRoute = ({ user, hasReceptionistParking, ...args }: any) => {
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

const PrivateRoute = ({ component, isAccessible, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAccessible ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export interface IContext {
  hasReceptionistParking: boolean;
}
export const Context = React.createContext<IContext>({
  hasReceptionistParking: false,
});

const user: User = User.Receptionist;
const hasReceptionistParking = false;
function App() {
  return (
    <Context.Provider value={{ hasReceptionistParking: false }}>
      <AppHeader user={user} hasReceptionistParking={hasReceptionistParking} />
      <Content className="content">
        <Switch>
          <RootRoute
            user={user}
            hasReceptionistParking={hasReceptionistParking}
            exact
            path="/"
          />
          <PrivateRoute
            exact
            path="/create"
            component={CreateParkingPage}
            isAccessible={user === User.Receptionist && !hasReceptionistParking}
          />
          <Route exact path="/explore" component={ExplorePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Content>
    </Context.Provider>
  );
}

export default App;
