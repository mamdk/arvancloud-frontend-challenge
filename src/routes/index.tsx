import SignInPage from 'src/pages/auth/signIn';
import SignUpPage from 'src/pages/auth/signUp';

const AppRoutes = {
	auth: [
		{ path: 'login', element: SignInPage },
		{ path: 'register', element: SignUpPage },
	],
	panel: [
		{ path: 'articles', element: SignInPage },
		{ path: 'articles/page/:page', element: SignInPage },
	],
};

export default AppRoutes;
