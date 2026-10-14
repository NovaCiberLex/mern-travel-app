import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../context/AppContext";

function Cities() {
  const { cities, loading, error, fetchCities } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        Cities
      </Typography>

      <TextField
        fullWidth
        label="Search cities"
        placeholder="Type a city name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        sx={{ mb: 3, maxWidth: 480 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && cities.length === 0 && (
        <Typography>No cities found.</Typography>
      )}

      {!loading && !error && cities.length > 0 && filteredCities.length === 0 && (
        <Alert severity="info">No cities match "{searchTerm}".</Alert>
      )}

      {!loading && !error && filteredCities.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {filteredCities.map((city) => (
            <Card key={city._id} sx={{ borderRadius: 3 }}>
              <CardActionArea onClick={() => navigate(`/itineraries/${city._id}`)}>
                <CardMedia
                  component="img"
                  image={city.image}
                  alt={city.name}
                  sx={{ height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                    {city.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {city.country}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Cities;