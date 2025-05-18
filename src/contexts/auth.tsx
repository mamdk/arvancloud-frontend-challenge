import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null as any);

export function AuthProvider({ children }) {
	const authState = useState({
		refetch: null,
		refetchKey: null,
		user: null,
		loading: true,
	});

	return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const [auth, setAuth] = useContext(AuthContext);

	function setRefetch(refetchMethod, refetchKey) {
		setAuth((currentAuth) => ({
			...currentAuth,
			refetch: refetchMethod,
			refetchKey,
		}));
	}

	function login(user) {
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
		}
	}

	function refetch() {
		if (auth.refetch instanceof Function) {
			setAuth((currentAuth) => ({
				...currentAuth,
				loading: true,
			}));

			auth.refetch().then((res) => {
				setAuth((currentAuth) => {
					if (res?.data?.[currentAuth.refetchKey]) {
						return {
							...currentAuth,
							user: res.data[currentAuth.refetchKey],
							loading: false,
						};
					}

					return {
						...currentAuth,
						loading: false,
					};
				});
			});
		}
	}

	return {
		user: auth.user,
		loading: auth.loading,

		setRefetch,
		refetch,

		login,
		logout,
	};
}

export default AuthContext;
