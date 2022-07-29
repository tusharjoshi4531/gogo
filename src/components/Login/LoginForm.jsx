import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
// import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";

const initialFormState = {
  email: {
    value: "",
    valid: false,
    hasChanged: false,
  },
  password: {
    value: "",
    valid: false,
    hasChanged: false,
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_BLUR":
      return {
        password: state.password,
        email: { ...state.email, hasChanged: true },
      };
    case "EMAIL_CHANGE":
      const newEmailState = state.email;
      newEmailState.value = action.payload;
      newEmailState.valid = action.payload.includes("@");

      return {
        password: state.password,
        email: newEmailState,
      };
    case "PASSWORD_BLUR":
      return {
        email: state.email,
        password: { ...state.password, hasChanged: true },
      };
    case "PASSWORD_CHANGE":
      const newPasswordState = state.password;
      newPasswordState.value = action.payload;
      newPasswordState.valid = action.payload.trim().length >= 7;

      return {
        password: newPasswordState,
        email: state.email,
      };
    case "CLEAR":
      return {
        email: {
          value: "",
          valid: false,
          hasChanged: false,
        },
        password: {
          value: "",
          valid: false,
          hasChanged: false,
        },
      };
    default:
      throw new Error("Invalid action");
  }
};

const LoginForm = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    ...initialFormState,
  });
  const [onLogin, setOnLogin] = useState(true);
  const [formHelperText, setFormHelperText] = useState('')
  const { createUser, loginUser } = useContext(AuthContext);

  const formIsValid = formState.email.valid && formState.password.valid;

  useEffect(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const onEmailInputChange = (e) => {
    dispatch({ type: "EMAIL_CHANGE", payload: e.target.value });
  };

  const onEmailBlur = () => {
    dispatch({ type: "EMAIL_BLUR" });
  };

  const onPasswordInputChange = (e) => {
    dispatch({ type: "PASSWORD_CHANGE", payload: e.target.value });
  };

  const onPasswordBlur = () => {
    dispatch({ type: "PASSWORD_BLUR" });
  };

  const onLoginToggle = () => {
    setOnLogin((state) => !state);
  };

  const onFormSubmit = async () => {
    let result = {};
    if (!onLogin) {
      result = await createUser(
        formState.email.value,
        formState.password.value
      );
    } else {
      result = await loginUser(formState.email.value, formState.password.value);
    }
    if(!result.ok){
      setFormHelperText(`ERROR: ${result.error}`)
    }
  };

  const emailInputHasError =
    !formState.email.valid && formState.email.hasChanged;
  const emailHelperText = emailInputHasError
    ? "@ symbol is required"
    : undefined;

  const passwordInputHasError =
    !formState.password.valid && formState.password.hasChanged;
  const passwordHelperText = passwordInputHasError
    ? "Atleast 5 characters required"
    : undefined;

  return (
    <Box sx={{ width: "400px", margin: "64px auto" }}>
      <Paper>
        <Stack p={4} spacing={4}>
          <Typography variant="h4" margin="auto">
            {onLogin ? "Login" : "Sign Up"}
          </Typography>
          <Stack spacing={2} alignItems="center" width="100%">
            <TextField
              value={formState.email.value}
              onChange={onEmailInputChange}
              onBlur={onEmailBlur}
              label="email"
              type="email"
              variant="standard"
              sx={{ width: "75%" }}
              error={emailInputHasError}
              helperText={emailHelperText}
            />
            <TextField
              value={formState.password.value}
              onChange={onPasswordInputChange}
              onBlur={onPasswordBlur}
              label="password"
              type="password"
              variant="standard"
              sx={{ width: "75%" }}
              error={passwordInputHasError}
              helperText={passwordHelperText}
            />
          </Stack>
          <Stack spacing={2} alignItems="center" width="100%">
            <Button
              variant="contained"
              disableElevation
              sx={{ width: "50%" }}
              disabled={!formIsValid}
              onClick={onFormSubmit}
            >
              {onLogin ? "Login" : "Create Account"}
            </Button>
            <Button
              variant="outlined"
              disableElevation
              sx={{ width: "50%" }}
              onClick={onLoginToggle}
            >
              {onLogin ? "Sign Up" : "Login"}
            </Button>
            <FormHelperText error>{formHelperText}</FormHelperText>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginForm;
