import { QueryClient } from 'react-query';
import toast from 'src/components/section/toast';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			cacheTime: 30 * 60 * 1000,
			retry: 2,
			refetchOnWindowFocus: false,
			onError: (error) => {
				console.error(error);
				toast({ type: 'error', title: 'Error receiving data!' });
			},
		},
		mutations: {
			onError: (error) => {
				console.error(error);
				toast({ type: 'error', title: 'Error sending data!' });
			},
		},
	},
});

export default queryClient;
