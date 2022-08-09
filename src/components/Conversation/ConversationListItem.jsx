import {
  Divider,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../store/auth-context";

const ConversationListItem = ({ divider, name, tagline, uid }) => {
  const navigate = useNavigate();
  const { uid: currUid } = useContext(AuthContext);

  return (
    <Fragment>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate(`/conversations?sender=${currUid}&reciever=${uid}`)}>
          <ListItemAvatar>
            <Avatar>TS</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={tagline} />
        </ListItemButton>
      </ListItem>
      {divider && <Divider />}
    </Fragment>
  );
};

export default ConversationListItem;
