import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    // Verificação simples por localStorage
    // Em um app real, poderíamos validar o token ou usar Context API
    const isAuthenticated = !!localStorage.getItem('ebook_user_email');

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
