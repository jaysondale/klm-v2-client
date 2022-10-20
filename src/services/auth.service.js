import config from "../config";

class AuthService {
    async login(email, password) {
        const body = {email, password};
        return fetch(`${config.api.root}${config.api.auth.login}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.tokens) {
                localStorage.setItem("user", JSON.stringify(data));
            }
            return data;
        });
    }

    async logout(refreshToken) {
        const body = {refreshToken};
        return fetch(`${config.api.root}${config.api.auth.logout}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            localStorage.removeItem("user");
        });
    }

    async register(name, email, password) {
        const body = {name, email, password};
        return fetch(`${config.api.root}${config.api.auth.register}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    async refresh(refreshToken) {
        const body = {refreshToken};
        return fetch(`${config.api.root}${config.api.auth.refreshTokens}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.tokens) {
                localStorage.setItem("user", JSON.stringify(data));
            }
        });
    }
}

export default new AuthService();