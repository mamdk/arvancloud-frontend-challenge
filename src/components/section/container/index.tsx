import styles from './index.module.sass';

function Container({ children, className = '' }) {
	return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export default Container;
