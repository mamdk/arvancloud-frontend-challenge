import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/contexts/auth';
import { useLocation, useNavigate } from 'react-router';
import Header from 'src/layout/panel/sections/header';
import { useEffect, useState } from 'react';
import Sidebar from 'src/layout/panel/sections/sidebar';
import { ToastContainer } from 'react-toastify';

function PanelLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();

	const [openSidebar, setOpenSidebar] = useState(false);

	useEffect(() => {
		const userToken = localStorage.getItem('user_token');

		if (!userToken) {
			void navigate('/auth/login');
		} else if (location.pathname === '/panel') {
			void navigate('/panel/articles');
		}
	}, []);

	return (
		<main className={styles.panel}>
			{user && (
				<>
					<Sidebar className={styles.sidebar} open={openSidebar} setOpenSidebar={setOpenSidebar} />

					<Header className={styles.header} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

					<Outlet />
				</>
			)}
			<ToastContainer className={styles.toastContainer} />
		</main>
	);
}

export default PanelLayout;
