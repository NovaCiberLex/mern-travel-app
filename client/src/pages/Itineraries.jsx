import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

function Itineraries() {
  const { cityId } = useParams();

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1">
        Itineraries Page
      </Typography>
      {cityId ? (
        <Typography sx={{ mt: 2 }}>City ID: {cityId}</Typography>
      ) : (
        <Typography sx={{ mt: 2 }}>Select a city to see its itineraries.</Typography>
      )}
    </Container>
  );
}

export default Itineraries;