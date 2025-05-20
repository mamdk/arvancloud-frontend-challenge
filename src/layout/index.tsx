import styles from './index.module.sass';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from 'src/layout/auth';
import AppRoutes from 'src/routes';
import { LoadingIndicatorPage } from 'src/components/ui/loading_indicator';
import PanelLayout from 'src/layout/panel';
import { ToastContainer } from 'react-toastify';

import NotFoundAuthPage from 'src/pages/auth/404';
import NotFoundPanelPage from 'src/pages/panel/404';
import { useAuth } from 'src/contexts/auth';
import { useQuery } from 'react-query';
import Request from 'src/utils/request';

function Layout() {
	const location = useLocation();

	const { user, login } = useAuth();

	const { isLoading: userLoading } = useQuery(
		'user',
		new Request('/user').get({
			'Content-Type': 'application/json',
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.user) {
					login(data.user);
				}
			},
		}
	);

	function generateRoutes(routes) {
		const output: any[] = [];

		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];

			const children: any = route.children?.length > 0 ? generateRoutes(route.children) : null;

			if (route.noRoute) {
				// eslint-disable-next-line react/jsx-no-undef
				output.push(<React.Fragment key={`route-${route.path}-${i}`}>{children}</React.Fragment>);
			} else {
				output.push(
					<Route
						key={`route-${route.path}-${i}`}
						path={route.path || undefined}
						index={(route.path === '') as true}
						element={route.element ? <route.element {...(route.pageProps || {})} /> : undefined}
					>
						{children}
					</Route>
				);
			}
		}

		return output;
	}

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className={styles.layout}>
			<Routes>
				<Route path={'/auth'} element={<AuthLayout />}>
					{!user ? (
						<>
							{generateRoutes(AppRoutes.auth)}
							<Route path={'*'} element={<NotFoundAuthPage />} />
						</>
					) : (
						<Route path={'*'} element={<Navigate to={'/panel'} replace />} />
					)}
				</Route>

				{userLoading ? (
					<Route path={'/panel/*'} element={<LoadingIndicatorPage fullPage />} />
				) : (
					<Route path={'/panel'} element={<PanelLayout />}>
						{user ? (
							<>
								{generateRoutes(AppRoutes.panel)}
								<Route path={'*'} element={<NotFoundPanelPage />} />
							</>
						) : (
							<Route path={'*'} element={<Navigate to={'/auth/login'} replace />} />
						)}
					</Route>
				)}

				<Route path={'/'} element={<Navigate to={user ? '/panel' : '/auth/login'} replace />} />
			</Routes>

			<ToastContainer />
		</div>
	);
}

export default Layout;
