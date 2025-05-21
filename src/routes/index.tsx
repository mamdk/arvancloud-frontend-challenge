import SignInPage from 'src/pages/auth/signIn';
import SignUpPage from 'src/pages/auth/signUp';
import ArticlesPage from 'src/pages/panel/articles';
import ArticleCreatePage from 'src/pages/panel/articles/create';

const AppRoutes = {
	auth: [
		{ path: 'login', element: SignInPage },
		{ path: 'register', element: SignUpPage },
	],
	panel: [
		{ path: 'articles', element: ArticlesPage },
		{ path: 'articles/page/:page', element: ArticlesPage },
		{ path: 'articles/create', element: ArticleCreatePage },
	],
};

export default AppRoutes;
