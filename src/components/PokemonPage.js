import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import useGetPokemon from "../hooks/useGetPokemon";

import RatingBox from "./RatingBox";
import Spinner from "./Spinner";

const PokemonPageComp = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const Name = styled.h1`
  text-transform: capitalize;
  margin-bottom: 30px;
`;

const FrontContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-basis: 1;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  h3 {
    margin: 0;
    width: 100px;
    text-transform: capitalize;
    text-align: right;
    margin-right: 20px;
  }

  p {
    margin: 0;
    margin-right: 15px;
  }
`;

const PokeImage = styled.img`
  width: 350px;
  height: 350px;
  flex-basis: 1;
`;

const Ratings = styled.div`
  width: 70%;
  position: relative;
  right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.5;
`;

const Rating = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  h3 {
    margin: 0;
    width: 300px;
    text-transform: capitalize;
    text-align: right;
    margin-right: 20px;
  }
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const PokemonPage = () => {
  const location = useLocation();
  const pokemonName = location.pathname.split("/")[2];

  const { loading, pokemon } = useGetPokemon(pokemonName);

  if (loading) {
    return <Spinner />;
  }

  return (
    <PokemonPageComp>
      <Name>{pokemon.name}</Name>
      <FrontContent>
        <PokeImage
          src={pokemon.sprites.other["official-artwork"].front_default}
        />
        <Info>
          <div>
            <h3>ID</h3>
            <p>#{pokemon.id}</p>
          </div>
          <div>
            <h3>Height</h3>
            <p>{pokemon.height} cm</p>
          </div>
          <div>
            <h3>Weight</h3>
            <p>{pokemon.weight} kg</p>
          </div>
          <div>
            <h3>Abilities</h3>
            {pokemon.abilities.map((ability) => (
              <p>
                <Capitalize>{ability.ability.name}</Capitalize>
              </p>
            ))}
          </div>
          <div>
            <h3>Type</h3>
            {pokemon.types.map((type) => (
              <p>
                <Capitalize>{type.type.name}</Capitalize>
              </p>
            ))}
          </div>
        </Info>
      </FrontContent>
      <Ratings>
        {pokemon.stats.map((stat, index) => {
          return (
            <Rating id={stat.stat.name}>
              <h3>{stat.stat.name}</h3>
              <RatingBox
                // title={stat.stat.name}
                rating={stat.base_stat}
                delay={index}
              />
            </Rating>
          );
        })}
      </Ratings>
    </PokemonPageComp>
  );
};

export default PokemonPage;
