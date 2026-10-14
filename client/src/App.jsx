import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import Landing from "./pages/Landing";
import Cities from "./pages/Cities";
import Itineraries from "./pages/Itineraries";
import Login from "./pages/Login";
import homeIcon from "./assets/home-icon.png";

function App() {
  return (
    <Box>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton component={Link} to="/" aria-label="Go to home page">
            <Box
              component="img"
              src={homeIcon}
              alt=""
              sx={{ width: 28, height: 28 }}
            />
          </IconButton>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/cities" color="secondary">
              Cities
            </Button>
            <Button component={Link} to="/itineraries" color="secondary">
              Itineraries
            </Button>
            <Button component={Link} to="/login" color="secondary">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/itineraries/:cityId" element={<Itineraries />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;