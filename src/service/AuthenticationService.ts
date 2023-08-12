import { Register } from '@/types/register';
import { Authentication } from '@/types/authentication';
import AxiosService from "./AxiosService";

class AuthenticationService {
    public static emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    public static brPhoneNumberRegex = /(\(\d{2}\))\s(\d{5})\-(\d{4})/;

    path = '/auth';
    
    register(body: Register) {
        return AxiosService.post(`${this.path}/register`, body)
    }

    authenticate(body: Authentication) {
        return AxiosService.post(`${this.path}/authenticate`, body)
    }

    isAValidEmail(text: string) {
        return AuthenticationService.emailRegex.test(text) || "Formato inválido de email"
    }

    isAValidPhoneNumber(text: string) {
        return AuthenticationService.brPhoneNumberRegex.test(text) || "Formato inválido de telefone"
    }

    requiredField(text: string) {
        return !!text || "O campo é obrigatório"
    }
}

export default new AuthenticationService();