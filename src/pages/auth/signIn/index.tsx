import { useState } from 'react';
import { useAuth } from 'src/contexts/auth';
import styles from './index.module.sass';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';
import Link from 'src/components/ui/link';
import { useMutation, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import toast from 'src/components/section/toast';

function SignInPage() {
	const queryClient = useQueryClient();

	const { login } = useAuth();

	const [errors, setErrors] = useState({} as any);

	const [data, setData] = useState({
		email: '',
		password: '',
	});

	function setDataValue(obj) {
		setData({ ...data, ...obj });
	}

	const { mutate, isLoading } = useMutation(new Request('/users/login').post(), {
		onSuccess: (data) => {
			if (data.errors) {
				setErrors(data.errors);
				toast({ type: 'error', title: 'Sign in failed', description: 'Username and/or Password is invalid' });
			} else if (data.user) {
				void queryClient.invalidateQueries('users');
				setData({ email: '', password: '' });
				toast({ type: 'success', title: 'Sign in successful' });
				login(data.user);
			}
		},
		onError: (error) => {
			console.error('sign in', error);
			toast({ type: 'error', title: 'Sign in failed' });
		},
	});

	// TODO: helmet

	return (
		<main className={styles.signInPage}>
			<Form
				title={'Sign in'}
				onSubmit={() => {
					mutate({ user: data });
				}}
				action={{
					type: 'submit',
					title: 'Sign in',
					fullWidth: true,
					loading: isLoading,
					disabled: data.email === '' || data.password === '',
				}}
				footer={
					<div className={styles.message}>
						<p>Don’t have an account?</p>
						<b>
							<Link to={'/auth/register'}>Sign up now</Link>
						</b>
					</div>
				}
			>
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

export default SignInPage;
