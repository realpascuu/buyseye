export default class ClientAPI {
    constructor(url) {
        this.API_URL = url;
    }

    async doLogin(login, password) {
        var resp = await fetch(this.API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: login, password: password })
        });
        if (resp.ok) {
            var token = await resp.json();
            return token.token
        } else {
            return '';
        }
    }
}