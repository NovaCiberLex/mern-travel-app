import { createContext, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  async function fetchItineraries(cityId) {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/itineraries/${cityId}`);
      setItineraries(response.data);
    } catch (err) {
      setError("Could not load itineraries. Please try again later.");
      console.error("Error fetching itineraries:", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        cities,
        itineraries,
        loading,
        error,
        fetchCities,
        fetchItineraries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}