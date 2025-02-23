import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
  useMediaQuery,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        <ListItemButton component={Link as any} to="/" onClick={() => isMobile && setMobileOpen(false)}>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link as any} to="/about" onClick={() => isMobile && setMobileOpen(false)}>
          <ListItemText primary="About" />
        </ListItemButton>
        {/* Add more routes here as needed */}
      </List>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Persistent AppBar */}
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
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

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: 8, // Ensure content is below the AppBar
          }}
        >
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={<Typography variant="h4" align="center">Welcome to Home Page</Typography>} />
              <Route path="/about" element={<Typography variant="h4" align="center">About Us</Typography>} />
              <Route path="*" element={<Typography variant="h6" align="center">Page Not Found</Typography>} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
