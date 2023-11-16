import jwtDecode, { JwtPayload } from 'jwt-decode';

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

    getAuthorizationHeader() {
        return {
            headers: {
                "Authorization": `Bearer ${this.getToken()}`
            }
        }
    }

    getAuthorizationAndMultipartFormDataHeader() {
        return {
            headers: {
                "Authorization": `Bearer ${this.getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    }

    getJwtDecode() {
        let jwtDecodedObj;
        const token = this.getToken();
        if (!token)
            return null
        try {
            jwtDecodedObj = jwtDecode<JwtPayload>(token);
        } catch (e) {
            console.error(e);
            alert("Ocorreu um erro ao decodificar o JWT") // TODO: Ajustar todos os alerts
        }
        return jwtDecodedObj
    }

    getRoles() {
        let jwtDecoded = this.getJwtDecode();
        if (!jwtDecoded) {
            console.error("Erro ao tentar pegar o sub do token") // TODO: Formalizar todo
            return null
        }
        return Object.entries(jwtDecoded)
            .filter((k: Array<string>) => k[0].includes("role"))
            .map((k: Array<string>) => k[1])
    }

    isAdmin() {
        if (this.getRoles()) return this.getRoles()?.find(r => r == "Admin")
        return false
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
        return true;
    }

    isExpired() {
        let jwtDecoded = this.getJwtDecode();
        if (!jwtDecoded)
            return true
        let exp = jwtDecoded.exp;
        const isExpired = !!exp && Date.now() > exp; // TODO: Verificar se precisa multiplicar por 1000
        return isExpired
    }
}

export default new TokenService();