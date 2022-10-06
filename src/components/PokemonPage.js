import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import useGetPokemon from "../hooks/useGetPokemon";

import RatingBox from "./RatingBox";
import Spinner from "./Spinner";
import TypePlaque from "./TypePlaque";

import typeToColor from "../shared/typeToColor";

const PokemonPageComp = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) =>
    props.type ? typeToColor(props.type) : "white"};
  height: 70px;
  margin-bottom: 20px;

  a {
    position: absolute;
    color: white;
    left: 100px;
    font-weight: 600;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  h3 {
    text-shadow: 0px 0px 5px #000;
  }
`;

const Name = styled.h1`
  text-transform: uppercase;
  margin: 0;
  color: white;
  text-shadow: 0px 0px 5px #000;
`;

const FrontContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 40px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media only screen and (max-width: 450px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 300px) {
    font-size: 10px;
  }

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    :last-of-type {
      margin: 0;
    }
  }

  h3 {
    margin: 0;
    width: 100px;
    text-transform: capitalize;
    text-align: right;
    margin-right: 20px;
    font-weight: 600;

    @media only screen and (max-width: 450px) {
      width: 70px;
    }
  }

  p {
    margin: 0;
  }
`;

const MarginRight = styled.div`
  margin: 0;
  margin-right: 15px;

  @media only screen and (max-width: 450px) {
    margin-right: 10px;
  }

  @media only screen and (max-width: 300px) {
    margin-right: 7px;
  }
`;

const PokeImage = styled.img`
  width: 350px;
  height: 350px;

  @media only screen and (max-width: 1200px) {
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 450px) {
    width: 250px;
    height: 250px;
    margin-bottom: 30px;
  }

  @media only screen and (max-width: 300px) {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
`;

const Ratings = styled.div`
  width: 50%;
  position: relative;
  right: 6%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0.5;

  @media only screen and (max-width: 1200px) {
    width: 60%;
  }

  @media only screen and (max-width: 800px) {
    right: 0;
  }

  @media only screen and (max-width: 450px) {
    width: 80%;
  }
`;

const Rating = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 450px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 300px) {
    font-size: 10px;
  }

  h3 {
    margin: 0;
    width: 300px;
    text-transform: capitalize;
    text-align: right;
    margin-right: 20px;
    font-weight: 600;

    @media only screen and (max-width: 800px) {
      width: 100%;
      text-align: left;
      margin: 0;
      margin-bottom: 10px;
    }
  }
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const CenterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PokemonPage = () => {
  const location = useLocation();
  const pokemonName = location.pathname.split("/")[2];

  const { loading, pokemon } = useGetPokemon(pokemonName);

  if (loading) {
    return (
      <CenterContainer>
        <Spinner />
      </CenterContainer>
    );
  }

  return (
    <PokemonPageComp>
      <Header type={pokemon.types[0].type.name}>
        <Name type={pokemon.types[0].type.name}>{pokemon.name}</Name>
      </Header>
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
            <p>{pokemon.height / 10} m</p>
          </div>
          <div>
            <h3>Weight</h3>
            <p>{pokemon.weight / 10} kg</p>
          </div>
          <div>
            <h3>Abilities</h3>
            {pokemon.abilities.map((ability, index) => (
              <MarginRight key={index + ability.ability.name}>
                <Capitalize>{ability.ability.name}</Capitalize>
              </MarginRight>
            ))}
          </div>
          <div>
            <h3>Type</h3>
            {pokemon.types.map((type, index) => (
              <MarginRight key={index + type.type.name}>
                <TypePlaque>{type.type.name}</TypePlaque>
              </MarginRight>
            ))}
          </div>
        </Info>
      </FrontContent>
      <Ratings>
        {pokemon.stats.map((stat, index) => {
          return (
            <Rating key={index + stat.stat.name}>
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
