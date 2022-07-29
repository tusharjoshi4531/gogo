import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AuthContext from "./store/auth-context";

const App = () => {
  const { idToken } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!idToken && <Route path="/login" element={<LoginPage />} />}
        {!!idToken && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
