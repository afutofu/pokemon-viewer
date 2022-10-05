import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { PokemonContext } from "../context/PokemonContext";

const useGetPokemons = (pokemonName, offset) => {
  const { pokemon } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemonSearch, setPokemonSearch] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const limit = 50;

  const getPokemonData = async (pokemon) => {
    const url = pokemon.url;

    return axios.get(url).then((res) => {
      return res.data;
    });
  };

  useEffect(() => {
    setPokemonSearch([]);
  }, [pokemonName]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (pokemonName.length > 0) {
      axios({
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      })
        .then((res) => {
          setHasMore(false);
          setLoading(false);
          setPokemonSearch([res.data]);
        })
        .catch((error) => {
          setError(true);
        });
    } else {
      axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/pokemon",
        params: { limit, offset },
      })
        .then(async (res) => {
          const promises = res.data.results.map(async (pokemon) => {
            return await getPokemonData(pokemon);
          });

          const pokemonsTemp = await Promise.all(promises);

          setHasMore(res.data.next !== null);
          setLoading(false);

          pokemon.setStorePokemons((prevPokemons) => {
            // Only add new pokemon if not already the same to avoid duplication
            if (prevPokemons.length > 0) {
              if (
                pokemonsTemp[pokemonsTemp.length - 1].id ===
                prevPokemons[prevPokemons.length - 1].id
              ) {
                return [...prevPokemons];
              } else {
                return [...prevPokemons, ...pokemonsTemp];
              }
            } else {
              return [...prevPokemons, ...pokemonsTemp];
            }
          });
        })
        .catch((error) => {
          setError(true);
        });
    } // eslint-disable-next-line
  }, [pokemonName, offset]);

  return {
    loading,
    error,
    pokemons: pokemon.storePokemons,
    pokemonSearch,
    hasMore,
  };
};

export default useGetPokemons;
