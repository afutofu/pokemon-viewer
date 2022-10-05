import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import PokemonPage from "./PokemonPage";

function App() {
  return (
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
  );
}

export default App;
