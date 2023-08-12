class TokenService {
    tokenProp = 'token';

    setToken(token: string) {
        localStorage.setItem(this.tokenProp, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenProp);
    }
}

export default new TokenService();