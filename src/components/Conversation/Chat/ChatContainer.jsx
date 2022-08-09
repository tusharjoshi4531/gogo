import { List, Box } from "@mui/material";
import Chat from "./Chat";

const ChatContainer = ({ messages }) => {
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
        {messages.map(({ type, message }, index) => {
          if (type !== "begin") {
            return (
              <Chat incoming={type === "recieved"} key={index}>
                {message}
              </Chat>
            );
          } else {
            return <></>;
          }
        })}
      </List>
    </Box>
  );
};

export default ChatContainer;
