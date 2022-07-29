import { List, Box } from "@mui/material";
import Chat from "./Chat";

const ChatContainer = () => {
  return (
    <Box
      sx={{
        bgcolor: "whitesmoke",
        width: "100%",
        flexGrow: "1",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <List>
        <Chat incoming>
          Helloqegagagaegaegaegaegaersfdadaaegageagaegeagaeaegaeggeagegageß
        </Chat>
        <Chat incoming>Hello</Chat>
      </List>
    </Box>
  );
};

export default ChatContainer;
