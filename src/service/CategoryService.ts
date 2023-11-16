import { IdAndName } from "@/types/idAndName";
import AxiosService from "./AxiosService";
import TokenService from "./TokenService";

class CategoryService {
    path = '/category';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: number) {
        return AxiosService.get(`${this.path}/${id}`)
    }

    save(form: IdAndName) {
        return AxiosService.post(`${this.path}/save`, form, TokenService.getAuthorizationHeader())
    }

    update(form: IdAndName) {
        return AxiosService.put(`${this.path}/save/${form.id}`, form, TokenService.getAuthorizationHeader())
    }

    delete(id: number) {
        return AxiosService.delete(`${this.path}/${id}`, TokenService.getAuthorizationHeader())
    }
}

export default new CategoryService();