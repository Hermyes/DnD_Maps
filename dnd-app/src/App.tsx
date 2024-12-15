import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { Home } from "./pages/Home/Home";
import CharactersListPage from "./pages/Character-list/CharacterList";
import { CharacterPage } from "./pages/CharacterPage/CharacterPage";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import AuthPage from "./pages/AuthPage/AuthPage";
import RegPage from "./pages/RegPage/RegPage";
import MapPage from "./pages/MapPage/MapPage";
import MapsPage from "./pages/MapsPage/MapsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


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
    <Router>
      
      <Routes>
        <Route path={ROUTES.HOME} index element={<Home />} />
        <Route path={ROUTES.CHARACTERS} element={<CharactersListPage />} />
        <Route path={`${ROUTES.CHARACTERS}/:character_id`} element={<CharacterPage />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route path={ROUTES.REGISTER} element={<RegPage />} />
        <Route path={`${ROUTES.MAP}/:request_id`} element={<MapPage />} />
        <Route path={ROUTES.MAPS} element={<MapsPage />} />
        <Route path={ROUTES.PROFILEPAGE} element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App
