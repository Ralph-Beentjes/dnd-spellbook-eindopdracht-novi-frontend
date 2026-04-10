import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Spells from './pages/spells/Spells.jsx';
import Spellbooks from './pages/spellbooks/Spellbooks.jsx';
import NavBar from './components/navBar/NavBar.jsx';

function App() {

  return (
    <>
        <nav>
            <NavBar />
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/spells" element={<Spells />} />
            <Route path="/spellbooks" element={<Spellbooks />} />
        </Routes>
    </>
  )
}

export default App
