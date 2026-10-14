import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

const API_URL = "http://localhost:5000/api";

function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchCities() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/cities`);
      setCities(response.data);
    } catch (err) {
      setError("Could not load cities. Please try again later.");
      console.error("Error fetching cities:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        Cities
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && cities.length === 0 && (
        <Typography>No cities found.</Typography>
      )}

      {!loading && !error && cities.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {cities.map((city) => (
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