import { BrowserRouter } from 'react-router-dom';
import Layout from 'src/layout';
import { AuthProvider } from 'src/contexts/auth';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Layout />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
