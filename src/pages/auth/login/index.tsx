import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'src/contexts/auth';
import styles from './index.module.sass';

function LoginPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [errors, setErrors] = useState({} as any);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	function setDataValue(obj) {
		setData({ ...data, ...obj });
	}

	return (
		<main className={styles.loginPage}>

			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>

			</form>
		</main>
	);
}

export default LoginPage;
