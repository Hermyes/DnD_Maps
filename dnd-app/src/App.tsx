import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { Home } from "./pages/Home/Home";
import CharactersListPage from "./pages/Character-list/CharacterList";
import { CharacterPage } from "./pages/CharacterPage/CharacterPage";


function App() {
  return (
    <Router basename="/RIP_Frontend">
      
      <Routes>
        <Route path={ROUTES.HOME} index element={<Home />} />
        <Route path={ROUTES.CHARACTERS} element={<CharactersListPage />} />
        <Route path={`${ROUTES.CHARACTERS}/:character_id`} element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App
