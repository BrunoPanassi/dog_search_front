import AxiosService from "./AxiosService";

class SubCategoryService {
    path = '/sub-category';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: Number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    
}

export default new SubCategoryService();