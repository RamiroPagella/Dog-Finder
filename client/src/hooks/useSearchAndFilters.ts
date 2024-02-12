import { useContext, useEffect } from "react";
import {
  SearchAndfiltersContext,
  SearchAndfiltersContextType,
} from "../context/searchAndfiltersContext";
import Axios from "../axios";

const useSearchAndFilters = () => {
  const {
    search,
    weight,
    height,
    temperaments,
    breedGroup,
    lifeSpan,
    setSearch,
    setWeight,
    setHeight,
    setTemperaments,
    setBreedGroup,
    setLifeSpan,
  } = useContext(SearchAndfiltersContext) as SearchAndfiltersContextType;

  useEffect(() => {
    Axios.get("/dogs");
  }, [search, weight, height, temperaments, breedGroup, lifeSpan]);

  return {
    search,
    weight,
    height,
    temperaments,
    breedGroup,
    lifeSpan,
    setSearch,
    setWeight,
    setHeight,
    setTemperaments,
    setBreedGroup,
    setLifeSpan,
  };
};
