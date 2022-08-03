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
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";

const NewConversationForm = ({
  open,
  onDialogFormSubmit,
  onDialogFormCancel,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Create Conversation</DialogTitle>
      <DialogContent>
        <Stack direction="row" sx={{ width: "450px" }}>
          <TextField sx={{flexGrow: "1"}} variant="standard" label="Email" />
          <Button
            variant="contained"
            size="small"
            disableElevation
            sx={{ marginTop: "10px", marginLeft: "15px" }}
          >
            Search
          </Button>
        </Stack>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>TS</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Test" secondary="test" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogFormSubmit}>Create</Button>
        <Button onClick={onDialogFormCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewConversationForm;
