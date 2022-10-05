const typeToColor = (type) => {
  switch (type) {
    case "normal":
      return "#aa9";
    case "fire":
      return "#f42";
    case "water":
      return "#39f";
    case "electric":
      return "#fc3";
    case "grass":
      return "#7c5";
    case "ice":
      return "#6cf";
    case "fighting":
      return "#b54";
    case "poison":
      return "#a59";
    case "ground":
      return "#db5";
    case "flying":
      return "#89f";
    case "psychic":
      return "#f59";
    case "bug":
      return "#ab2";
    case "rock":
      return "#ba6";
    case "ghost":
      return "#66b";
    case "dragon":
      return "#76e";
    case "dark":
      return "#754";
    case "steel":
      return "#aab";
    case "fairy":
      return "#e9e";
  }
};

export default typeToColor;
