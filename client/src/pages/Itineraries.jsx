import { useContext, useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AppContext } from "../context/AppContext";

function Itineraries() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const { itineraries, loading, error, fetchItineraries } = useContext(AppContext);

  const [maxPrice, setMaxPrice] = useState(null);
  const [maxDuration, setMaxDuration] = useState("all");

  useEffect(() => {
    if (cityId) {
      fetchItineraries(cityId);
      setMaxPrice(null);
      setMaxDuration("all");
    }
  }, [cityId]);

  const highestPrice = Math.max(0, ...itineraries.map((item) => item.price ?? 0));
  const priceLimit = maxPrice ?? highestPrice;

  const filteredItineraries = itineraries.filter((item) => {
    const matchesPrice = item.price == null || item.price <= priceLimit;
    const matchesDuration =
      maxDuration === "all" || item.duration == null || item.duration <= Number(maxDuration);
    return matchesPrice && matchesDuration;
  });

  const cityName = itineraries.length > 0 ? itineraries[0].city?.name : null;

  function resetFilters() {
    setMaxPrice(null);
    setMaxDuration("all");
  }

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
        <>
          {/* Filters */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 3, textAlign: "left" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: { xs: "stretch", sm: "center" } }}
            >
              <Box sx={{ flex: 1, px: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Max price: ${priceLimit}
                </Typography>
                <Slider
                  value={priceLimit}
                  min={0}
                  max={highestPrice}
                  step={5}
                  onChange={(event, value) => setMaxPrice(value)}
                  valueLabelDisplay="auto"
                  aria-label="Maximum price"
                />
              </Box>

              <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel id="duration-label">Max duration</InputLabel>
                <Select
                  labelId="duration-label"
                  label="Max duration"
                  value={maxDuration}
                  onChange={(event) => setMaxDuration(event.target.value)}
                >
                  <MenuItem value="all">Any duration</MenuItem>
                  <MenuItem value="3">Up to 3 h</MenuItem>
                  <MenuItem value="5">Up to 5 h</MenuItem>
                  <MenuItem value="8">Up to 8 h</MenuItem>
                </Select>
              </FormControl>

              <Button variant="outlined" onClick={resetFilters}>
                Reset filters
              </Button>
            </Stack>
          </Paper>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: "left" }}>
            Showing {filteredItineraries.length} of {itineraries.length} itineraries
          </Typography>

          {filteredItineraries.length === 0 ? (
            <Alert severity="info">No itineraries match your filters.</Alert>
          ) : (
            <Stack spacing={2}>
              {filteredItineraries.map((itinerary) => (
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
        </>
      )}
    </Container>
  );
}

export default Itineraries;