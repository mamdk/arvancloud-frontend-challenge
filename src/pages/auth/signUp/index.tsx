import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from 'src/contexts/auth';
import styles from './index.module.sass';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';
import Link from 'src/components/ui/link';
import { useMutation, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import toast from 'src/components/section/toast';

function SignUpPage() {
	const queryClient = useQueryClient();

	const { login } = useAuth();

	const [errors, setErrors] = useState({} as any);

	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
	});

	function setDataValue(obj) {
		setData({ ...data, ...obj });
	}

	const { mutate, isLoading } = useMutation(new Request('/users').post(), {
		onSuccess: (data) => {
			if (data.errors) {
				setErrors(data.errors);
				toast({ type: 'error', title: 'Sign up failed' });
			} else if (data.user) {
				void queryClient.invalidateQueries('users');
				setData({ username: '', email: '', password: '' });
				toast({ type: 'success', title: 'Sign up successful' });
				login(data.user);
			}
		},
		onError: (error) => {
			console.error('sign up', error);
			toast({ type: 'error', title: 'Sign up failed' });
		},
	});

	return (
		<main className={styles.signUpPage}>
			<Form
				title={'Sign up'}
				onSubmit={() => {
					mutate({ user: data });
				}}
				action={{
					type: 'submit',
					title: 'Sign up',
					fullWidth: true,
					loading: isLoading,
					disabled: data.email === '' || data.username === '' || data.password === '',
				}}
				footer={
					<div className={styles.message}>
						<p>Have an account?</p>
						<b>
							<Link to={'/auth/login'}>Sign in</Link>
						</b>
					</div>
				}
			>
				<Field label={'Username'} fullWidth error={errors?.username} message={errors?.username}>
					<Input
						name={'username'}
						placeholder={'Username'}
						fullWidth
						error={errors?.username}
						onChange={(val) => {
							setDataValue({ username: val });
						}}
					/>
				</Field>
				<Field label={'Email'} fullWidth error={errors?.email} message={errors?.email}>
					<Input
						name={'email'}
						placeholder={'Email'}
						fullWidth
						error={errors?.email}
						onChange={(val) => {
							setDataValue({ email: val });
						}}
					/>
				</Field>
				<Field label={'Password'} fullWidth error={errors?.password} message={errors?.password}>
					<Input
						type={'password'}
						name={'password'}
						placeholder={'Password'}
						fullWidth
						error={errors?.password}
						onChange={(val) => {
							setDataValue({ password: val });
						}}
					/>
				</Field>
			</Form>
		</main>
	);
}

export default SignUpPage;
