import {
  Divider,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { Fragment } from "react";

const ConversationListItem = ({ divider }) => {
  return (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>TS</Avatar>
          </ListItemAvatar>
        </ListItemButton>
      </ListItem>
      {divider && <Divider />}
    </Fragment>
  );
};

export default ConversationListItem;
