import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const NotLoggedInHomePage = () => {
  const navigate = useNavigate();

  const loginCLickHandler = () => {
    navigate("/login");
  };

  return (
    <Paper sx={{ margin: 8, paddingX: 4, paddingY: 12, borderRadius: 2 }}>
      <Stack spacing={8} alignItems="center">
        <Typography variant="h2" textAlign="center" fontWeight="bold">
          WELCOME TO GOGO
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "15%", marginX: "auto" }}
          disableElevation
          onClick={loginCLickHandler}
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
};

export default NotLoggedInHomePage;
