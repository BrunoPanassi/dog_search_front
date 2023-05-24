import AxiosService from "./AxiosService";

class CategoryService {
    path = '/category';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: Number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    
}

export default new CategoryService();