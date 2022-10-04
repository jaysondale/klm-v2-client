import config from "../config";

class AuthService {
    login(email, password) {
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

    logout(refreshToken) {
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

    register(name, email, password) {
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
}

export default new AuthService();