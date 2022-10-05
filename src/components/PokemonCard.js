import React from "react";
import styled from "styled-components";

const PokemonCardComp = styled.a`
  width: 250px;
  /* height: 350px; */
  border: 1px solid #000;
  border-radius: 10px;
  color: black;
  text-decoration: none;

  :hover {
    border: 1px solid #aaa;
  }
`;

const PokeImage = styled.img`
  width: 100%;
  height: 220px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const Name = styled.h1`
  text-transform: capitalize;
  margin: 0;
`;

const Types = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  text-transform: capitalize;
`;

const PokemonCard = ({ pokemon, innerRef }) => {
  return (
    <PokemonCardComp href={`/pokemon/${pokemon.name}`} ref={innerRef}>
      <PokeImage
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt="pokemon official artwork"
      />
      <Content>
        <Name>{pokemon.name}</Name>
        <Types>
          {pokemon.types.map((type, index) => (
            <p key={pokemon.id + index}>{type.type.name}</p>
          ))}
        </Types>
      </Content>
    </PokemonCardComp>
  );
};

export default PokemonCard;
