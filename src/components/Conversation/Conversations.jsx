import { Paper, List, Grid, Stack } from "@mui/material";
import ChatContainer from "./Chat/ChatContainer";
import ChatInput from "./Chat/ChatInput";
import ConversationListItem from "./ConversationListItem";

const Conversations = () => {
  return (
    <Paper sx={{ margin: 3, padding: 3 }}>
      <Grid container>
        <Grid item xs={3} sx={{ height: "80vh", overflow: "scroll" }}>
          <List>
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
            <ConversationListItem divider />
          </List>
        </Grid>
        <Grid item xs={9} paddingLeft={2} maxHeight="80vh">
          <Stack height="100%" spacing={2}>
            <ChatContainer />
            <ChatInput />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Conversations;
