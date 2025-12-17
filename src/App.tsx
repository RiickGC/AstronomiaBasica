import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Force deploy trigger
import Home from './pages/Home';
import EbooksShowcase from './pages/EbooksShowcase';

import Reader from './pages/Reader';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vitrine" element={<EbooksShowcase />} />
        <Route path="/pvastronomiabasica" element={<SalesPage />} />
        <Route path="/leitor/:bookId" element={<Reader />} />
        <Route path="/leitor/:bookId/:chapterId" element={<Reader />} />
      </Routes>
    </Router>
  );
}

export default App;
