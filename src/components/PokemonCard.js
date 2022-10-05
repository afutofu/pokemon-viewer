import React from "react";
import styled from "styled-components";

import TypePlaque from "./TypePlaque";

import typeToColor from "../shared/typeToColor";

const PokemonCardComp = styled.a`
  position: relative;
  width: 210px;
  /* height: 350px; */
  border: 1px solid #000;
  border-radius: 10px;
  color: black;
  text-decoration: none;
  background-color: white;
  transition: box-shadow 0.2s ease;
  overflow: hidden;
  box-shadow: 2px 2px 1px 1px #ccc;

  :hover {
    border: 1px solid
      ${(props) => (props.type ? typeToColor(props.type) : "#aaa")};
    box-shadow: 0px 0px 10px 1px
      ${(props) => (props.type ? typeToColor(props.type) : "#aaa")};
  }

  > p {
    margin: 0;
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 14px;
  }
`;

const PokeImage = styled.img`
  width: 100%;
  /* height: 220px; */
  padding: 10px;
  padding-top: 25px;
  box-sizing: border-box;
  background-color: white;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  border-top: 1px solid #000;
  background-color: rgb(245, 245, 245);
`;

const Name = styled.h1`
  text-transform: capitalize;
  margin-bottom: 10px;
  margin-top: 15px;
  /* margin-bottom: 10px; */
  font-size: 22px;
`;

const Types = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const PokemonCard = ({ pokemon, innerRef }) => {
  return (
    <PokemonCardComp
      href={`/pokemon/${pokemon.name}`}
      ref={innerRef}
      type={pokemon.types[0].type.name}
    >
      <p>{pokemon.id}</p>
      <PokeImage
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt="pokemon official artwork"
      />
      <Content>
        <Name>{pokemon.name}</Name>
        <Types>
          {pokemon.types.map((type, index) => (
            <TypePlaque key={pokemon.id + index}>{type.type.name}</TypePlaque>
          ))}
        </Types>
      </Content>
    </PokemonCardComp>
  );
};

export default PokemonCard;
