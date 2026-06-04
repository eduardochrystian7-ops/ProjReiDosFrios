import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
	const email = localStorage.getItem('@ReiDosFrios:email');
	const senha = localStorage.getItem('@ReiDosFrios:senha');

	// Simples checagem de presença de credenciais armazenadas
	if (!email || !senha) {
		return <Navigate to="/" replace />;
	}

	return children;
}
