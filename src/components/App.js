import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import PokemonPage from "./PokemonPage";

import { PokemonProvider } from "../context/PokemonContext";

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="/pokemon/:pokemonName"
            element={<PokemonPage />}
          ></Route>
        </Routes>
      </Router>
    </PokemonProvider>
  );
}

export default App;
