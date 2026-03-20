import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { deleteContact } from "../../redux/contacts/operations";
import { type AppDispatch, type RootState } from "../../redux/store";
import toast from "react-hot-toast";

export const ContactList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.items);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success("Contact deleted"))
      .catch(() => toast.error("Error deleting contact"));
  };

  if (contacts.length === 0) {
    return (
      <Typography sx={{ mt: 2, textAlign: "center" }} color="text.secondary">
        Your phonebook is empty.
      </Typography>
    );
  }

  return (
    <List sx={{ width: "100%", mt: 2 }}>
      {contacts.map(({ id, name, number }) => (
        <Paper key={id} elevation={1} sx={{ mb: 1, borderRadius: 2 }}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.light" }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={number}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};
