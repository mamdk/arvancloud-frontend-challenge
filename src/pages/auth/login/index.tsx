import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'src/contexts/auth';
import styles from './index.module.sass';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';

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

	const [open, setOpen] = useState(false);

	return (
		<main className={styles.loginPage}>
			<Form
				title={'Sign-up'}
				action={{
					title: 'sign-up',
					handler: () => {
						console.log('click');
					},
					fullWidth: true,
				}}
			>
				<Field label={'Email'} fullWidth>
					<Input name={'email'} placeholder={'Email'} fullWidth />
				</Field>
				<Field label={'Password'} fullWidth>
					<Input type={'password'} name={'password'} placeholder={'Password'} fullWidth />
				</Field>
			</Form>
		</main>
	);
}

export default LoginPage;
