import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoggedInHomePage from "./LoggedInHomePage";
import NotLoggedInHomePage from "./NotLoggedInHomePage";

const HomePageContent = () => {
  const { idToken } = useContext(AuthContext);

  return (
    <Fragment>
      {!idToken && <NotLoggedInHomePage />}
      {!!idToken && <LoggedInHomePage />}
    </Fragment>
  );
};

export default HomePageContent;
