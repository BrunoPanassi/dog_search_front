import AxiosService from "./AxiosService";

class AnnouncementService {
    path = '/announcement';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: Number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    getCities() {
        return AxiosService.get(`${this.path}/cities`)
    }
}

export default new AnnouncementService();