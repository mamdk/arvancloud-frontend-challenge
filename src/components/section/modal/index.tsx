import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Container from 'src/components/section/container';
import CircleCheckSVG from 'src/assets/icons/circle-check-light.svg';
import TriangleExclamationSVG from 'src/assets/icons/triangle-exclamation-light.svg';
import { useEffect, useState } from 'react';

interface TModalProps {
	open?: boolean;
	onClose?: () => void;
	className?: string;
	children?: any;
	title: string;
	description?: string;
	actions?: any;
	dialogueOptions?: {
		type: 'success' | 'error';
		message: string;
	};
	size?: 'sm' | 'md' | 'lg';
}

function Modal({
	open = true,
	onClose,
	className,
	children,
	actions = null,
	title,
	description,
	dialogueOptions,
	size = 'md',
}: TModalProps) {
	const [close, setClose] = useState(!open);

	useEffect(() => {
		setClose(!open);
	}, [open]);

	const handleClose = () => {
		setClose(true);

		if (onClose instanceof Function) {
			onClose();
		}
	};

	return (
		<main className={cls(styles.modalSection, className, close && styles.close)}>
			<Container className={cls(styles.container)}>
				<div className={cls(styles.back)} onClick={handleClose} />

				<section className={cls(styles.modal, styles[size])}>
					<header>
						<h3>{title}</h3>
						{description && <p>{description}</p>}
					</header>

					{dialogueOptions ? (
						<div className={cls(styles.dialogue)}>
							<span className={cls(styles.icon, styles[dialogueOptions.type])}>
								{dialogueOptions.type === 'success' ? <CircleCheckSVG /> : <TriangleExclamationSVG />}
							</span>
							<p className={cls(styles.message)}>{dialogueOptions.message}</p>
						</div>
					) : (
						children
					)}

					{actions && <footer>{actions}</footer>}
				</section>
			</Container>
		</main>
	);
}

export default Modal;
