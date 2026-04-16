import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import AddSpell from './pages/addSpell/AddSpell.jsx';
import Spellbooks from './pages/spellbooks/Spellbooks.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import CreateSpellbook from "./pages/createSpellbook/CreateSpellbook.jsx";
import SingleSpellbook from "./pages/singleSpellbook/SingleSpellbook.jsx";

function App() {

  return (
    <>
        <nav>
            <NavBar />
        </nav>
        <div className='page-content'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-spell" element={<AddSpell />} />
                <Route path="/spellbooks" element={<Spellbooks />} />
                <Route path="/create-spellbook" element={<CreateSpellbook />} />
                <Route path="/spellbooks/:id" element={<SingleSpellbook />} />
            </Routes>
        </div>
    </>
  )
}

export default App
