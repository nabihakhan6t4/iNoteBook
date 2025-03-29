import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";

import "./index.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Notes from "./components/Notes";

function App() {
  return (
    <NoteState>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes />} />

      </Routes>
    </NoteState>
  );
}

export default App;
