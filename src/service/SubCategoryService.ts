import { SubCategory, SubCategorySaveDTO } from "@/types/subCategory";
import AxiosService from "./AxiosService";
import TokenService from "./TokenService";

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

    save(form: SubCategorySaveDTO) {
        return AxiosService.post(`${this.path}/save`, form, TokenService.getAuthorizationHeader())
    }

    update(form: SubCategory) {
        return AxiosService.put(`${this.path}/save/${form.id}`, form, TokenService.getAuthorizationHeader())
    }

    delete(id: number) {
        return AxiosService.delete(`${this.path}/${id}`, TokenService.getAuthorizationHeader())
    }
    
}

export default new SubCategoryService();