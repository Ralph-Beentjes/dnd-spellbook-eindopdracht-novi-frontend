import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import AddSpell from './pages/addSpell/AddSpell.jsx';
import Spellbooks from './pages/spellbooks/Spellbooks.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import CreateSpellbook from "./pages/createSpellbook/CreateSpellbook.jsx";
import SingleSpellbook from "./pages/singleSpellbook/SingleSpellbook.jsx";
import CreateSpellAdmin from "./pages/createSpellAdmin/CreateSpellAdmin.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import Admin from "./pages/admin/Admin.jsx";
import CreateClassAdmin from "./pages/createClassAdmin/CreateClassAdmin.jsx";
import DeleteClassAdmin from "./pages/deleteClassAdmin/DeleteClassAdmin.jsx";
import DeleteSpellAdmin from "./pages/deleteSpellAdmin/DeleteSpellAdmin.jsx";
import DeleteSpellbook from "./pages/deleteSpellbook/DeleteSpellbook.jsx";

function App() {
  const { auth } = useContext(AuthContext);

  const isAdmin = auth.roles.includes('ROLE_ADMIN');

  return (
    <>
        <nav>
            <NavBar />
        </nav>
        <div className='page-content'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/spellbooks" element={<Spellbooks />} />
                <Route path="/create-spellbook" element={<CreateSpellbook />} />
                <Route path="/delete-spellbook" element={<DeleteSpellbook />} />
                <Route path="/spellbooks/:id" element={<SingleSpellbook />} />
                <Route path="/add-spell/:id" element={<AddSpell />} />
                <Route path="/admin" element={isAdmin && <Admin />} />
                <Route path="/create-class" element={isAdmin && <CreateClassAdmin />} />
                <Route path="/delete-class" element={isAdmin && <DeleteClassAdmin />} />
                <Route path="/create-spell" element={isAdmin && <CreateSpellAdmin />} />
                <Route path="/delete-spell" element={isAdmin && <DeleteSpellAdmin />} />
            </Routes>
        </div>
    </>
  )
}

export default App
