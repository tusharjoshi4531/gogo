import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useReducer } from "react";
import AuthContext from "../../store/auth-context";

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "NAME_CHANGE":
      const name = action.payload;
      const nameIsValid = name.trim().length >= 5;
      return { ...state, name, nameIsValid };

    case "TAGLINE_CHANGE":
      return { ...state, tagline: action.payload };

    case "NAME_BLUR":
      return { ...state, nameIsEdited: true };

    case "INIT":
      const { name: initName, tagline: initTagline } = action.payload;
      return {
        name: !initName ? "" : initName,
        tagline: !initTagline ? "" : initTagline,
        nameIsValid: initName.trim() >= 5,
        nameIsEdited: false,
      };

    default:
      throw new Error("Invalid form action!");
  }
};

const ProfileForm = () => {
  const { name, tagline, updateUserInfo } = useContext(AuthContext);
  const [formState, dispatch] = useReducer(formStateReducer, {
    name: !name ? "" : name,
    tagline: !tagline ? "" : tagline,
    nameIsValid: name.trim().length >= 5,
    nameIsEdited: false,
  });

  const nameChangeHandler = (e) => {
    dispatch({ type: "NAME_CHANGE", payload: e.target.value });
  };

  const taglineChangeHandler = (e) => {
    dispatch({ type: "TAGLINE_CHANGE", payload: e.target.value });
  };

  const nameBlurHandler = () => {
    dispatch({ type: "NAME_BLUR" });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    updateUserInfo(formState.name, formState.tagline);
  };

  const nameHasError = !formState.nameIsValid && formState.nameIsEdited;
  const nameHelperText = nameHasError
    ? "Name must contain atleast 5 characters!"
    : undefined;

  return (
    <Paper sx={{ marginX: "auto", marginY: 3, padding: 5, maxWidth: "550px" }}>
      <Stack
        component="form"
        spacing={2}
        alignItems="center"
        onSubmit={formSubmitHandler}
      >
        <Typography variant="h3" textAlign="center">
          UPDATE PROFILE
        </Typography>
        <Divider />
        <TextField
          variant="standard"
          label="name"
          size="large"
          sx={{ width: "75%" }}
          value={formState.name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameHasError}
          helperText={nameHelperText}
        />
        <TextField
          variant="standard"
          label="tagline"
          size="large"
          sx={{ width: "75%" }}
          value={formState.tagline}
          onChange={taglineChangeHandler}
        />
        <Button
          type="submit"
          disableElevation
          disabled={!formState.nameIsValid}
          variant="contained"
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
};

export default ProfileForm;
