import AxiosService from "./AxiosService";
import { CityAndSubCategory } from "@/types/announcement.cityAndSubCategory";

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

    getCityAndSubCategory(DTO: CityAndSubCategory) {
        return AxiosService.post(`${this.path}/city-and-sub-category`, DTO)
    }
}

export default new AnnouncementService();