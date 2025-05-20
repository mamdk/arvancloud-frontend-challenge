import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null as any);

export function AuthProvider({ children }) {
	const authState = useState({
		user: null,
		loading: true,
	});

	return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const [auth, setAuth] = useContext(AuthContext);

	function login(user) {
		localStorage.setItem('user_token', user.token);

		setAuth((currentAuth) => ({
			...currentAuth,
			user,
			loading: false,
		}));
	}

	function logout() {
		if (auth.user) {
			setAuth((currentAuth) => ({
				...currentAuth,
				user: null,
				loading: false,
			}));

			localStorage.removeItem('user_token');
		}
	}

	return {
		user: auth.user,
		loading: auth.loading,

		login,
		logout,
	};
}

export default AuthContext;
