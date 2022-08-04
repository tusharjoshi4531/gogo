import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from "../../../firebase/database-utility";

const ListProfileItem = ({ name, tagline, uid, onClick }) => {
  const clickHandler = () => {
    onClick(name, tagline, uid);
  }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={clickHandler}>
        <ListItemAvatar>
          <Avatar>TS</Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={tagline} />
      </ListItemButton>
    </ListItem>
  );
};

const NewConversationForm = ({
  open,
  onDialogFormSubmit,
  onDialogFormCancel,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const searchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchHandler = async () => {
    const response = await getData("/users");
    let t = [];
    for (const key in response.data) {
      const val = response.data[key];
      if (val.name.includes(searchInput)) {
        t.push({ ...val });
      }
    }
    setFoundUsers(t);
  };

  const listItemClickHandler = (name, tagline, uid) => {
    onDialogFormSubmit(name, tagline, uid)
  }

  useEffect(() => {
    setFoundUsers([]);
  }, [])

  const buttonIsDisabled = searchInput.trim() === ""

  return (
    <Dialog open={open}>
      <DialogTitle>Create Conversation</DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          sx={{ width: "450px" }}
          value={searchInput}
          onChange={searchInputChangeHandler}
        >
          <TextField
            sx={{ flexGrow: "1" }}
            variant="standard"
            label="User Name"
          />
          <Button
            variant="contained"
            size="small"
            disableElevation
            sx={{ marginTop: "10px", marginLeft: "15px" }}
            onClick={searchHandler}
            disabled={buttonIsDisabled}
          >
            Search
          </Button>
        </Stack>
        <List sx={{ maxHeight: "200px", overflow: "scroll" }}>
          {foundUsers.map((user) => (
            <ListProfileItem
              name={user.name}
              tagline={user.tagline}
              key={user.uid}
              uid={user.uid}
              onClick={listItemClickHandler}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogFormCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewConversationForm;
