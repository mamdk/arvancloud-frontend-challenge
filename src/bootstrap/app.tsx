import { BrowserRouter } from 'react-router-dom';
import Layout from 'src/layout';
import { AuthProvider } from 'src/contexts/auth';
import { QueryClientProvider } from 'react-query';
import queryClient from 'src/utils/client';

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Layout />
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
