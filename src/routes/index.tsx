import SignInPage from 'src/pages/auth/signIn';
import SignUpPage from 'src/pages/auth/signUp';
import ArticlesPage from 'src/pages/panel/articles';

const AppRoutes = {
	auth: [
		{ path: 'login', element: SignInPage },
		{ path: 'register', element: SignUpPage },
	],
	panel: [
		{ path: 'articles', element: ArticlesPage },
		{ path: 'articles/page/:page', element: ArticlesPage },
	],
};

export default AppRoutes;
