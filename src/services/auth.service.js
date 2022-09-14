import config from "../config";

class AuthService {
    login(email, password) {
        const body = {email, password};
        fetch(`${config.api.root}${config.api.auth.login}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
        });
    }
    logout() {

    }
    register(name, email, password) {
        const body = {name, email, password};
        fetch(`${config.api.root}${config.api.auth.register}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
        });
    }
}

export default new AuthService();