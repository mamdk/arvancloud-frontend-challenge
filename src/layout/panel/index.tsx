import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/contexts/auth';
import { useNavigate } from 'react-router';
import Header from 'src/layout/panel/sections/header';
import { useEffect } from 'react';
import Sidebar from 'src/layout/panel/sections/sidebar';

function PanelLayout() {
	const { user } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		const userToken = localStorage.getItem('user_token');

		if (!userToken) {
			void navigate('/auth/login');
		}
	}, []);

	return (
		<main className={styles.panel}>
			{user && (
				<>
					<Sidebar className={styles.sidebar} />

					<Header className={styles.header} />

					<div className={styles.container}>
						<Outlet />
					</div>
				</>
			)}
		</main>
	);
}

export default PanelLayout;
