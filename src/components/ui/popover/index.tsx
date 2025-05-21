import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface PopoverProps {
	className?: string;
	children: any;
	trigger: any;
	position?: 'bottom' | 'top' | 'left' | 'right';
	open?: boolean;
	closeOnOutsideClick?: boolean;
}

const Popover = ({ className, trigger, children, position = 'bottom', closeOnOutsideClick = true }: PopoverProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef(null as any);
	const [calculatedPosition, setCalculatedPosition] = useState(position);
	const triggerRef = useRef(null as any);

	const calculateBestPosition = () => {
		if (!triggerRef.current || !popoverRef.current) return position;

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const popoverRect = popoverRef.current.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		const space = {
			top: triggerRect.top - popoverRect.height,
			right: viewportWidth - triggerRect.right - popoverRect.width,
			bottom: viewportHeight - triggerRect.bottom - popoverRect.height,
			left: viewportWidth - (viewportWidth - triggerRect.left) - popoverRect.width,
		};

		if (
			(position === 'top' && space.top > 10) ||
			(position === 'right' && space.right > 10) ||
			(position === 'bottom' && space.bottom > 10) ||
			(position === 'left' && space.left > 10)
		) {
			return position;
		}

		const possiblePositions = Object.entries(space)
			.filter(([_, value]) => value > 10)
			.sort((a, b) => b[1] - a[1]);

		return possiblePositions.length > 0 ? possiblePositions[0][0] : position;
	};

	useEffect(() => {
		if (isOpen) {
			setCalculatedPosition(calculateBestPosition() as any);
		}

		if (!closeOnOutsideClick || !isOpen) return;

		const handleClickOutside = (event) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target) &&
				triggerRef.current &&
				!triggerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, closeOnOutsideClick, position]);

	const getPositionStyle = () => {
		if (!triggerRef.current) return {};

		const triggerRect = triggerRef.current.getBoundingClientRect();

		if (calculatedPosition === 'top') {
			return {
				bottom: `${window.innerHeight - triggerRect.top + 10}px`,
				left: `${Math.max(10, Math.min(triggerRect.left - triggerRect.width - 20, window.innerWidth - 10))}px`,
			};
		} else if (calculatedPosition === 'right') {
			return {
				top: `${Math.max(10, Math.min(triggerRect.top, window.innerHeight - 10))}px`,
				left: `${triggerRect.right + 10}px`,
			};
		} else if (calculatedPosition === 'left') {
			return {
				top: `${Math.max(10, Math.min(triggerRect.top, window.innerHeight - 10))}px`,
				right: `${window.innerWidth - triggerRect.left + 10}px`,
			};
		} else if (calculatedPosition === 'bottom') {
			return {
				top: `${triggerRect.bottom + 10}px`,
				left: `${Math.max(10, Math.min(triggerRect.left - triggerRect.width - 20, window.innerWidth - 10))}px`,
			};
		}
	};

	return (
		<div className={cls(styles.popoverSection, className)}>
			<div
				className={styles.trigger}
				ref={triggerRef}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				{trigger}
			</div>

			<div className={cls(styles.popover, isOpen && styles.popoverOpen)} ref={popoverRef} style={getPositionStyle()}>
				{children}
			</div>
		</div>
	);
};

export default Popover;

// export default Popover;
