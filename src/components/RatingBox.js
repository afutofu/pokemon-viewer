import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes` 
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
`;

const RatingBoxComp = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 10px;
`;

const Title = styled.p`
  position: relative;
  text-transform: capitalize;
  margin: 0;
  z-index: 100;
`;

const Rating = styled.p`
  position: absolute;
  /* opacity: 0; */
  right: 10px;
  z-index: 100;
`;

const RatingBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => (props.width ? props.width : "0%")};
  transform: translateX(-100%);
  background: ${(props) =>
    props.background ? props.background : "greenyellow"};
  z-index: 0;
  animation: ${slideIn} 1s 0.4s ease forwards;
`;

const RatingBox = ({ title, rating, delay }) => {
  const widthMultiplier = (widthPerc) => {
    if (widthPerc > 90) return 1 * widthPerc;
    else if (widthPerc > 80) return 1.05 * widthPerc;
    else if (widthPerc > 70) return 1.1 * widthPerc;
    else if (widthPerc > 60) return 1.15 * widthPerc;
    else if (widthPerc > 50) return 1.2 * widthPerc;
    else if (widthPerc > 40) return 1.3 * widthPerc;
    else if (widthPerc > 30) return 1.4 * widthPerc;
    else if (widthPerc > 20) return 1.5 * widthPerc;
    else return 1.6 * widthPerc;
  };

  const percentageToColor = (perc) => {
    // console.log(perc);
    // let r,
    //   g,
    //   b = 0;
    // if (perc < 50) {
    //   r = 255;
    //   g = Math.round(5.1 * perc);
    // } else {
    //   g = 255;
    //   r = Math.round(510 - 5.1 * perc);
    // }
    // let h = r * 0x10000 + g * 0x100 + b * 0x1;
    // return "#" + ("000000" + h.toString(16)).slice(-6);

    if (perc <= 10) return "#f34444";
    else if (perc <= 24) return "#ff7f0f";
    else if (perc <= 35) return "#ffdd57";
    else if (perc <= 45) return "#a0e515";
    else if (perc <= 55) return "#23cd5e";
    else return "#00c2b8";
  };

  return (
    <RatingBoxComp>
      {/* <Title>{title}</Title> */}
      <Rating>{rating}</Rating>
      <RatingBar
        width={`${widthMultiplier((rating / 255) * 100)}%`}
        background={`${percentageToColor((rating / 255) * 100)}`}
      />
    </RatingBoxComp>
  );
};

export default RatingBox;
