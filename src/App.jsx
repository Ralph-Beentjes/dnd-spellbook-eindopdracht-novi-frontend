import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from 'src/pages/home/Home.jsx';
import Profile from 'src/pages/profile/Profile.jsx';
import Spells from 'src/pages/spells/Spells.jsx';
import Spellbooks from 'src/pages/spellbooks/Spellbooks.jsx';
import NavBar from 'src/components/NavBar.jsx';

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
