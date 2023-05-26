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

    
}

export default new SubCategoryService();