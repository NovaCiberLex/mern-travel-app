import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mytinerary-logo.jpg";
import hero from "../assets/hero.jpg";

function Landing() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header */}
      <Box component="header" sx={{ py: 2, px: 2 }}>
        <Box
          component="img"
          src={logo}
          alt="MYtinerary logo"
          sx={{ width: "100%", maxWidth: { xs: 260, md: 400 }, height: "auto" }}
        />
      </Box>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: { xs: 10, md: 16 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Find your perfect trip
          </Typography>
          <Typography variant="h6" component="p" sx={{ mt: 2 }}>
            Designed by insiders who know and love their cities.
          </Typography>
        </Container>
      </Box>

      {/* Call-To-Action Section */}
      <Box component="section" sx={{ py: 4, px: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<ArrowCircleRightOutlinedIcon />}
            onClick={() => navigate("/itineraries")}
            sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 320 }}
          >
            View Itineraries
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
            sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 320 }}
          >
            Login
          </Button>
        </Stack>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, px: 2 }}>
        <Typography variant="body2">© 2026 MYtinerary</Typography>
      </Box>
    </Box>
  );
}

export default Landing;