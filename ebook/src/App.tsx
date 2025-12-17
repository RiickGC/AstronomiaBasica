import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import ChapterContent from './pages/ChapterContent';
import BottomNav from './components/BottomNav';
import SalesPage from './pages/SalesPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';


function Layout() {
  const location = useLocation();
  // Esconde a nav bar na página de vendas e login
  const hideNav = ['/pvebook', '/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0a0a16] text-white font-sans antialiased">
      <Routes>
        <Route path="/" element={<Navigate to="/pvebook" replace />} />
        <Route path="/pvebook" element={<SalesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas Protegidas */}
        {/* Rotas Protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/app" element={<Home />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/chapter/:id" element={<ChapterContent />} />

          {/* Rotas Dinâmicas para Novos Ebooks */}
          <Route path="/leitor/:ebookId" element={<Chapters />} />
          <Route path="/leitor/:ebookId/chapter/:id" element={<ChapterContent />} />
        </Route>
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
