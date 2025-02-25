import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import IsMobileView from "../hooks/IsMobileView";

const drawerWidth = 240;

const PersistentLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = IsMobileView();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleNavClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  

  const drawer = (
    <Box>
  <Toolbar />
  <List>
    <ListItemButton component={RouterLink} to="/home" onClick={handleNavClick}>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/about" onClick={handleNavClick}>
      <ListItemText primary="About" />
    </ListItemButton>
    {/* Add more routes here if needed */}
  </List>
</Box>

  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Persistent AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Vikasa App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // push content below the AppBar
        }}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default PersistentLayout;
