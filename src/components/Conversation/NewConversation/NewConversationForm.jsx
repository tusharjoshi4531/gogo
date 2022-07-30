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
  TextField,
} from "@mui/material";

const NewConversationForm = ({ open, onDialogFormSubmit, onDialogFormCancel }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Create Conversation</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: "450px" }}
          variant="standard"
          label="Email"
        />
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
