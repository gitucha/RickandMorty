import Rickandmorty from './components/Rickandmorty';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterDetail from "./CharacterDetail";

function App() {

  return (
    <>
    <Router>
      <Routes>
       <Route path="/" element={<Rickandmorty />} />
       <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
