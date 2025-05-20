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

	post() {
		return async (body: Record<string, any>) => {
			const res = await fetch(this.url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			return await res.json();
		};
	}
}

export default Request;
