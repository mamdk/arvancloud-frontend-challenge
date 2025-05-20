import SignInPage from 'src/pages/auth/signIn';
import SignUpPage from 'src/pages/auth/signUp';

const AppRoutes = {
	auth: [
		{ path: 'login', element: SignInPage },
		{ path: 'register', element: SignUpPage },
	],
	panel: [],
};

export default AppRoutes;
