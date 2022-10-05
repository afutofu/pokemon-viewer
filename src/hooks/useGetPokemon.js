import { useState, useEffect } from "react";
import axios from "axios";

const useGetPokemon = (pokemonName) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setPokemon(null);

    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    })
      .then((res) => {
        setLoading(false);
        setError(false);
        setPokemon(res.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [pokemonName]);

  return { loading, error, pokemon };
};

export default useGetPokemon;
