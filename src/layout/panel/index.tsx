import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/contexts/auth';
import { useNavigate } from 'react-router';
import Header from 'src/layout/panel/sections/header';
import { useEffect, useState } from 'react';
import Sidebar from 'src/layout/panel/sections/sidebar';

function PanelLayout() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [openSidebar, setOpenSidebar] = useState(false);

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
					<Sidebar className={styles.sidebar} open={openSidebar} />

					<Header className={styles.header} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

					<Outlet />
				</>
			)}
		</main>
	);
}

export default PanelLayout;
