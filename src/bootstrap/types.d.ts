declare module '*.sass' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.scss' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.css' {
	type IClassNames = Record<string, string>;
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.svg' {
	const Schema: string;
	export = Schema;
}

declare module '*.jpeg' {
	const Schema: string;
	export = Schema;
}

declare module '*.jpg' {
	const Schema: string;
	export = Schema;
}

declare module '*.png' {
	const Schema: string;
	export = Schema;
}

declare module '*.webp' {
	const Schema: string;
	export = Schema;
}

declare module '*.json' {
	const Schema: Record<string, any>;
	export = Schema;
}
