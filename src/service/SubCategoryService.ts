import { SubCategory } from "@/types/subCategory";
import AxiosService from "./AxiosService";

class SubCategoryService {
    path = '/sub-category';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: Number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    getByCategory(name: String) {
        return AxiosService.get(`${this.path}/category?name=${name}`)
    }

    save(form: SubCategory) {
        return AxiosService.post(`${this.path}/save`, form)
    }

    update(form: SubCategory) {
        return AxiosService.put(`${this.path}/save/${form.id}`, form)
    }

    delete(id: number) {
        return AxiosService.delete(`${this.path}/${id}`)
    }
    
}

export default new SubCategoryService();