import { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import ConversationPage from "./pages/ConversationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";

const App = () => {
  const { idToken } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!idToken && (
          <Fragment>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Fragment>
        )}
        {!!idToken && (
          <Fragment>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/conversations" element={<ConversationPage />} />
            <Route path="/*" element={<Navigate to="/conversations" />} />
          </Fragment>
        )}
      </Routes>
    </Layout>
  );
};

export default App;
