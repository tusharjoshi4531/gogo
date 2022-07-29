import { ListItem, Paper } from "@mui/material";

const Chat = ({ children, incoming }) => {
  return (
    <ListItem sx={{ justifyContent: !incoming ? "flex-end" : "flex-start" }}>
      <Paper
        sx={{
          padding: "4px",
          maxWidth: "50%",
          overflowWrap: "break-word",
          backgroundColor: !incoming ? "success.light" : "white",
          color: !incoming ? "white" : "black",
        }}
      >
        {children}
      </Paper>
    </ListItem>
  );
};

export default Chat;
