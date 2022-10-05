import React from "react";
import styled from "styled-components";

import typeToColor from "../shared/typeToColor";

const TypePlaqueComp = styled.div`
  background-color: ${(props) =>
    props.type ? typeToColor(props.type) : "white"};
  color: white;
  text-transform: uppercase;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0;
  text-shadow: 0px 0px 0px #000;

  @media only screen and (max-width: 450px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 300px) {
    font-size: 10px;
  }
`;

const TypePlaque = ({ children }) => {
  return <TypePlaqueComp type={children}>{children}</TypePlaqueComp>;
};

export default TypePlaque;
