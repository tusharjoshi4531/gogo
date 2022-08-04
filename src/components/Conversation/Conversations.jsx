import { Paper, List, Grid, Stack, Button } from "@mui/material";
import ChatContainer from "./Chat/ChatContainer";
import ChatInput from "./Chat/ChatInput";
import ConversationListItem from "./ConversationListItem";
import AddIcon from "@mui/icons-material/Add";
import { Fragment, useState } from "react";
import NewConversationForm from "./NewConversation/NewConversationForm";

const Conversations = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const addConversationClickHandler = () => {
    setDialogIsOpen(true);
  };

  const dialogSubmitHandler = (name, tagline, uid) => {
    console.log({ name, tagline, uid });
    setDialogIsOpen(false);
  };

  const dialogCancelHandler = () => {
    setDialogIsOpen(false);
  };

  return (
    <Fragment>
      <Paper sx={{ margin: 3, padding: 3 }}>
        <Grid container>
          <Grid
            item
            xs={3}
            sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
          >
            <List sx={{ flexGrow: 1, overflow: "scroll" }}>
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
            <Button onClick={addConversationClickHandler}>
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs={9} paddingLeft={2} maxHeight="80vh">
            <Stack height="100%" spacing={2}>
              <ChatContainer />
              <ChatInput />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <NewConversationForm
        open={dialogIsOpen}
        onDialogFormSubmit={dialogSubmitHandler}
        onDialogFormCancel={dialogCancelHandler}
      />
    </Fragment>
  );
};

export default Conversations;
