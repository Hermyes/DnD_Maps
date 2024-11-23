import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { Home } from "./pages/Home/Home";
import CharactersListPage from "./pages/Character-list/CharacterList";
import { CharacterPage } from "./pages/CharacterPage/CharacterPage";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";


function App() {
  useEffect(() => {
    invoke('tauri', {cmd: 'create'})
    .then((response: any) => console.log(response))
    .catch((error: any) => console.log(error))

    return () => {
      invoke('tauri', {cmd: 'close'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
    }
  }, [])




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
