import decode from 'jwt-decode';

interface JwtDecode {
    exp: number,
    iat: number,
    sub: string
}

class TokenService {
    tokenProp = 'token';

    setToken(token: string) {
        localStorage.setItem(this.tokenProp, token);
    }

    getToken() {
        return localStorage.getItem(this.tokenProp);
    }

    signOut() {
        localStorage.removeItem(this.tokenProp)
    }

    getJwtDecode() {
        let jwtDecoded: JwtDecode = {
            exp: 0,
            iat: 0,
            sub: ""
        };
        const token = this.getToken();
        if (!token)
            return null
        try {
            jwtDecoded = decode(token);
        } catch (e) {
            console.error(e);
            alert("Ocorreu um erro ao decodificar o JWT") // TODO: Ajustar todos os alerts
        }
        return jwtDecoded
    }

    getSub() {
        let jwtDecoded = this.getJwtDecode();
        if (!jwtDecoded) {
            console.error("Erro ao tentar pegar o sub do token") // TODO: Formalizar todo
            return null
        }
        return jwtDecoded.sub
    }

    isSignedIn() {
        let jwtDecoded = this.getJwtDecode();
        if (!jwtDecoded)
            return false
        let exp = jwtDecoded.exp;
        const isExpired = !!exp && Date.now() > exp; // TODO: Verificar se precisa multiplicar por 1000
        return isExpired
    }
}

export default new TokenService();