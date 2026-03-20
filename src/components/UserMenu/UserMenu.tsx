import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import type { AppDispatch } from "../../redux/store";

export const UserMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
        {user.name?.[0].toUpperCase()}
      </Avatar>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Welcome, {user.name}
      </Typography>
      <Button
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<LogoutIcon />}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </Button>
    </Box>
  );
};
