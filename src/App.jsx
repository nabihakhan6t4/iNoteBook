import About from "./components/About";
import AddNote from "./components/AddNote";
import Header from "./components/Header";
import Home from "./components/Home";
import Notes from "./components/Notes";
import NoteState from "./context/notes/NoteState";
import "./index.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <NoteState>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/addnote" element={<AddNote />} />

        </Routes>
      </NoteState>
    </>
  );
}

export default App;
