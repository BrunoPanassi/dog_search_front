import { IdAndName } from "@/types/idAndName";
import AxiosService from "./AxiosService";

class CategoryService {
    path = '/category';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    save(form: IdAndName) {
        return AxiosService.post(`${this.path}/save`, form);
    }

    update(form: IdAndName) {
        return AxiosService.put(`${this.path}/save/${form.id}`, form)
    }

    delete(id: number) {
        return AxiosService.delete(`${this.path}/${id}`)
    }
}

export default new CategoryService();