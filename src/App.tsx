import React, { useEffect, useState } from "react";
import "./app.scss";
import { Content, Loading } from "carbon-components-react";
import AppHeader from "./components/AppHeader";
import { Redirect, Route, Switch } from "react-router-dom";
import LandingPage from "./content/LandingPage";
import ExplorePage from "./content/ExplorePage";
import ReceptionistPage from "./content/ReceptionistPage";
import CreateParkingPage from "./content/CreateParkingPage";
import NoMatch from "./components/NoMatch";
import SignupPage from "./content/SignupPage";
import LoginPage from "./content/LoginPage";
import firebase from "firebase";

export enum UserType {
  Automobilist,
  Receptionist,
  Guest,
}
interface User {
  type: string;
  hasReceptionistParking?: boolean;
}

const RootRoute = ({ user, hasReceptionistParking, ...args }: any) => {
  let component;
  switch (user) {
    case UserType.Receptionist:
      component = () => <ReceptionistPage />;
      break;
    case UserType.Automobilist:
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(UserType.Guest);
  const [hasReceptionistParking, setHasReceptionistParking] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("/users")
          .doc(user.uid)
          .get()
          .then((docRef) => {
            setIsLoading(false);
            const user = docRef.data() as User;
            setUserType(
              user.type === "Receptionist"
                ? UserType.Receptionist
                : UserType.Automobilist
            );
            if (user.type === "Receptionist") {
              setHasReceptionistParking(user.hasReceptionistParking!);
            }
          });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Context.Provider value={{ hasReceptionistParking }}>
      <AppHeader
        user={userType}
        hasReceptionistParking={hasReceptionistParking}
      />
      <Content className="content">
        <Switch>
          <RootRoute
            user={userType}
            hasReceptionistParking={hasReceptionistParking}
            exact
            path="/"
          />
          <PrivateRoute
            exact
            path="/create"
            component={CreateParkingPage}
            isAccessible={
              userType === UserType.Receptionist && !hasReceptionistParking
            }
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
