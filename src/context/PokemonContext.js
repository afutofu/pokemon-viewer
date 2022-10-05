import React, { useState, createContext } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = (props) => {
  const [storePokemons, setStorePokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  return (
    <PokemonContext.Provider
      value={{
        pokemon: { storePokemons, setStorePokemons },
        offset: { offset, setOffset },
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};
