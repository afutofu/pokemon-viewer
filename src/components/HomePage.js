import React, { useState, useRef, useCallback, useContext } from "react";
import styled from "styled-components";

import useGetAllPokemon from "../hooks/useGetAllPokemon";

import PokemonCard from "./PokemonCard";

import { PokemonContext } from "../context/PokemonContext";

const HomePageComp = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  background-color: #fefefe;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #009565;
  height: 70px;
  margin-bottom: 20px;

  h2 {
    position: absolute;
    color: white;
    left: 100px;
  }

  h3 {
    position: absolute;
    color: white;
    right: 100px;
  }
`;

const PokemonSearchInput = styled.input`
  height: 40px;
  width: 30%;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;

  > * {
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const HomePage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const { offset, setOffset } = useContext(PokemonContext).offset;

  const { loading, pokemons, pokemonSearch, hasMore } = useGetAllPokemon(
    pokemonName,
    offset
  );

  const observer = useRef();
  const last15PokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 50);
        }
      });
      if (node) observer.current.observe(node);
    }, // eslint-disable-next-line
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setPokemonName(e.target.value);
  };

  const renderPokemons = () => {
    if (pokemonName.length > 0) {
      return pokemonSearch.map((pokemon, index) => {
        return <PokemonCard key={pokemon.id + index} pokemon={pokemon} />;
      });
    } else {
      return pokemons.map((pokemon, index) => {
        if (index === pokemons.length - 15) {
          return (
            <PokemonCard
              innerRef={last15PokemonElementRef}
              key={pokemon.id + index}
              pokemon={pokemon}
            />
          );
        }
        return <PokemonCard key={pokemon.id + index} pokemon={pokemon} />;
      });
    }
  };

  return (
    <HomePageComp>
      <Header>
        <h2>Gokomodo Pokedex</h2>
        <h3>Muhammad Afuzarahman</h3>
        <PokemonSearchInput
          onChange={handleSearch}
          value={pokemonName}
          placeholder="Enter pokemon name or ID..."
        />
      </Header>

      <CardContainer>{renderPokemons()}</CardContainer>
    </HomePageComp>
  );
};

export default HomePage;
