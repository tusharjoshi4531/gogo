import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import NavButtonLink from "./NavButtonLink";

const Navbar = () => {
  const { idToken, logout, name } = useContext(AuthContext);

  console.log(name)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {name === "" ? "GOGO" : name}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button color="inherit">
            <NavButtonLink to="/">Home</NavButtonLink>
          </Button>
          {!!idToken && (
            <Button>
              <NavButtonLink to="/profile">Profile</NavButtonLink>
            </Button>
          )}
          {!idToken && (
            <Button color="inherit">
              <NavButtonLink to="/login">Login</NavButtonLink>
            </Button>
          )}
          {!!idToken && (
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
