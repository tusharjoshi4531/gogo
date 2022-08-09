import { Paper, List, Grid, Stack, Button } from "@mui/material";
import ConversationListItem from "./ConversationListItem";
import AddIcon from "@mui/icons-material/Add";
import { Fragment, useContext, useEffect, useState } from "react";
import NewConversationForm from "./NewConversation/NewConversationForm";
import useConversations from "../../hooks/use-conversations";
import AuthContext from "../../store/auth-context";
import ChatBox from "./Chat/ChatBox";
import { useSearchParams } from "react-router-dom";

const Conversations = () => {
  const [searchParams] = useSearchParams();

  let senderUid = searchParams.get("sender");
  let recieverUid = searchParams.get("reciever");

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { uid } = useContext(AuthContext);
  const {
    createConversation,
    fetchTransformedCurrentConversations,
    conversations,
  } = useConversations(uid);

  const addConversationClickHandler = () => {
    setDialogIsOpen(true);
  };

  const dialogSubmitHandler = (name, tagline, recieverUid) => {
    console.log({ name, tagline, uid });
    createConversation(uid, recieverUid, name, tagline);
    setDialogIsOpen(false);
  };

  const dialogCancelHandler = () => {
    setDialogIsOpen(false);
  };

  useEffect(() => {
    fetchTransformedCurrentConversations();
  }, [fetchTransformedCurrentConversations]);

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
              {conversations.map(({ uid, name, tagline }) => (
                <ConversationListItem
                  divider
                  name={name}
                  uid={uid}
                  tagline={tagline}
                  key={uid}
                />
              ))}
            </List>
            <Button onClick={addConversationClickHandler}>
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs={9} paddingLeft={2} maxHeight="80vh">
            <Stack height="100%" spacing={2}>
              <ChatBox sendurUid={senderUid} recieverUid={recieverUid} />
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
