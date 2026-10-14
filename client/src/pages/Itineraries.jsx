import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppContext } from "../context/AppContext";

function Itineraries() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const { itineraries, loading, error, fetchItineraries } = useContext(AppContext);

  useEffect(() => {
    if (cityId) {
      fetchItineraries(cityId);
    }
  }, [cityId]);

  const cityName = itineraries.length > 0 ? itineraries[0].city?.name : null;

  if (!cityId) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Itineraries
        </Typography>
        <Typography sx={{ mb: 3 }}>Select a city to see its itineraries.</Typography>
        <Button variant="contained" onClick={() => navigate("/cities")}>
          Browse cities
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        color="secondary"
        onClick={() => navigate("/cities")}
        sx={{ mb: 2 }}
      >
        Back to cities
      </Button>

      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        {cityName ? `Itineraries in ${cityName}` : "Itineraries"}
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && itineraries.length === 0 && (
        <Alert severity="info">No itineraries available yet.</Alert>
      )}

      {!loading && !error && itineraries.length > 0 && (
        <Stack spacing={2}>
          {itineraries.map((itinerary) => (
            <Card key={itinerary._id} sx={{ borderRadius: 3, textAlign: "left" }}>
              <CardContent>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                  {itinerary.title}
                </Typography>
                {itinerary.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {itinerary.description}
                  </Typography>
                )}
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {itinerary.price != null && (
                    <Chip label={`$${itinerary.price}`} color="primary" size="small" />
                  )}
                  {itinerary.duration != null && (
                    <Chip label={`${itinerary.duration} h`} color="secondary" size="small" />
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default Itineraries;