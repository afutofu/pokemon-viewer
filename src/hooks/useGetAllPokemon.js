import { useState, useEffect } from "react";
import axios from "axios";

const useGetPokemons = (pokemonName, offset) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const getPokemonData = async (pokemon) => {
    const url = pokemon.url;

    return axios.get(url).then((res) => {
      return res.data;
    });
  };

  useEffect(() => {
    setPokemons([]);
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
          setPokemons([res.data]);
        })
        .catch((error) => {
          setError(true);
        });
    } else {
      axios({
        method: "GET",
        url: "https://pokeapi.co/api/v2/pokemon",
        params: { limit: 50, offset },
      })
        .then(async (res) => {
          const promises = res.data.results.map(async (pokemon) => {
            return await getPokemonData(pokemon);
          });

          const pokemonsTemp = await Promise.all(promises);

          setHasMore(res.data.next !== null);
          setLoading(false);
          setPokemons((prevPokemons) => [...prevPokemons, ...pokemonsTemp]);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [pokemonName, offset]);

  return { loading, error, pokemons, hasMore };
};

export default useGetPokemons;
