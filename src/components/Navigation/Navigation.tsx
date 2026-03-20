import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Box } from '@mui/material';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
      <Button component={NavLink} to="/" color="inherit">
        Home
      </Button>
      {isLoggedIn && (
        <Button component={NavLink} to="/contacts" color="inherit">
          Contacts
        </Button>
      )}
    </Box>
  );
};