import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface LoadingIndicatorProps {
	className?: string;
	size?: number | string;
	progress?: any;
	initialSize?: number;
	strokeWidth?: number;
	progressRenderer?: (progress) => string;
}

function LoadingIndicator({
	className,
	size = 25,
	progress = null,
	initialSize = 100,
	strokeWidth = 10,
	progressRenderer = null as any,
}: LoadingIndicatorProps) {
	const hasProgress = progress !== null && progress !== undefined;
	const outerSize = initialSize + strokeWidth;
	const center = outerSize / 2;
	const perimeter = initialSize * Math.PI;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={`0 0 ${outerSize} ${outerSize}`}
			className={cls(styles.loadingIndicator, !hasProgress && styles.shouldRotate, className)}
			style={{ width: `${size}px`, height: `${size}px`, '--perimeter': `${perimeter}px` } as any}
		>
			<circle
				cx={center}
				cy={center}
				r={initialSize / 2}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				stroke='currentColor'
				strokeDasharray={
					hasProgress ? `0 0 ${((progress || 0) * perimeter) / 10}rem ${(perimeter * 3) / 10}rem` : (null as any)
				}
				fill='none'
			/>
			{progressRenderer instanceof Function && (
				<text
					x={center}
					y={center}
					dominantBaseline='middle'
					textAnchor='middle'
					style={{ fontSize: initialSize / 3, fill: 'currentColor' }}
				>
					{progressRenderer(progress)}
				</text>
			)}
		</svg>
	);
}

export function LoadingIndicatorPage({
	className,
	size = 35,
	fullPage = false,
	fillPage = false,
	fitPage = false,
}: any) {
	return (
		<div
			className={cls(
				'loadingPage',
				styles.loadingPage,
				fullPage && styles.fullPage,
				fillPage && styles.fillPage,
				fitPage && styles.fitPage,
				className
			)}
		>
			<LoadingIndicator size={size} />
		</div>
	);
}

export default LoadingIndicator;
