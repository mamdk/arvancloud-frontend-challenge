class Request {
	baseURL = 'https://api-3281216083-arvancloud-challenge.apps.ir-central1.arvancaas.ir/api';

	path: string;

	url: string;

	constructor(path: string) {
		this.path = path;
		this.url = `${this.baseURL}${this.path}`;
	}

	get(headers?: Record<string, any>) {
		return async () => {
			const res = await fetch(this.url, { method: 'GET', headers });
			return await res.json();
		};
	}

	post(headers: Record<string, any>) {
		return async (body: Record<string, any>) => {
			const res = await fetch(this.url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
				body: JSON.stringify(body),
			});

			return await res.json();
		};
	}

	delete(headers?: Record<string, any>) {
		return async (slug: string) => {
			const res = await fetch(this.url.replace(/\{\{slug\}\}/, slug), {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
			});

			return res;
		};
	}
}

export default Request;
