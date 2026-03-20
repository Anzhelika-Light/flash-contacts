import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { fetchContacts } from "../redux/contacts/operations";
import { type AppDispatch, type RootState } from "../redux/store";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { ContactList } from "../components/ContactList/ContactList";

const ContactsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.contacts.isLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contacts
        </Typography>
        <ContactForm />
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {isLoading && <CircularProgress />}
      </Box>

      <ContactList />
    </Container>
  );
};

export default ContactsPage;
