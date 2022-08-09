import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ChatInput = ({ onSubmit }) => {
  const [messageInput, setMessageInput] = useState("");

  const messageInputChangeHandler = (e) => {
    setMessageInput(e.target.value);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(messageInput);
  };
  return (
    <Stack
      component="form"
      direction="row"
      spacing={2}
      onSubmit={messageSubmitHandler}
    >
      <TextField
        label="message"
        sx={{ flexGrow: "1" }}
        size="small"
        value={messageInput}
        onChange={messageInputChangeHandler}
      />
      <Button type="submit" variant="contained" disableElevation>
        <SendIcon />
      </Button>
    </Stack>
  );
};

export default ChatInput;
