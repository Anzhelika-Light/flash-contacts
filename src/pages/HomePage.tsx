import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          <ContactPhoneIcon
            sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
          />

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            FlashContacts
          </Typography>

          <Typography variant="h5" color="text.secondary" paragraph>
            {isLoggedIn
              ? `Glad to see you again, ${user.name}! Your contacts are safe with us.`
              : "The most convenient way to store and manage your personal contacts."}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            {isLoggedIn ? (
              <Button
                variant="contained"
                size="large"
                component={NavLink}
                to="/contacts"
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
              >
                Go to My Contacts
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  component={NavLink}
                  to="/register"
                  sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={NavLink}
                  to="/login"
                  sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                  Log In
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
