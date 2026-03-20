import type { ReactNode } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { AppBar } from "../AppBar/AppBar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar />
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
};
