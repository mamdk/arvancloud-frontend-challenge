import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const root = path.resolve(__dirname);

export default defineConfig(({ mode }) => ({
	root: path.resolve(root, 'src/bootstrap'),
	plugins: [
		react(),
		svgr({
			include: '**/*.svg',
		}),
	],
	css: {
		modules: {
			scopeBehaviour: 'local',
			generateScopedName: mode === 'development' ? '[local]__[hash:base64:4]' : '[hash:base64:8]',
			localsConvention: 'camelCase',
		},
		preprocessorOptions: {
			sass: {
				additionalData: `@use "src/theme/variables.sass" as *\n`,
			},
		},
	},
	build: {
		outDir: path.resolve(root, 'build'),
		sourcemap: true,
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
				},
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
	preview: {
		port: 8080,
		open: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(root, 'src/bootstrap/index.tsx'),
			src: path.resolve(root, 'src'),
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
	},
	optimizeDeps: {
		entries: [path.resolve(root, 'src/bootstrap/index.tsx')],
	},
	envDir: './env',
}));
