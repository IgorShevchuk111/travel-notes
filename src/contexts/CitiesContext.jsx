import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/cities`);
        const data = res.data;
        setCities(data);
      } catch (err) {
        alert("Error loading data...");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/cities/${id}`);
      const data = res.data;
      setCurrentCity(data);
    } catch (err) {
      alert("Error loading data...");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(city) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/cities`, city);
      const data = res.data;

      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error creating city.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/cities/${id}`);
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("There was an error deleting city.");
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        createCity,
        deleteCity,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outides the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
