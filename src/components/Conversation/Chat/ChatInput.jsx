import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
  const messageSubmitHandler = e => {
    e.preventDefault();
  }
  return (
    <Stack component="form" direction="row" spacing={2} onSubmit={messageSubmitHandler}>
      <TextField label="message" sx={{ flexGrow: "1" }} size="small" />
      <Button type="submit" variant="contained" disableElevation>
        <SendIcon />
      </Button>
    </Stack>
  );
};

export default ChatInput;

