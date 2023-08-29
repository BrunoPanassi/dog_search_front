import AxiosService from "./AxiosService";
import { CityAndSubCategory } from "@/types/announcement.cityAndSubCategory";
import { AnnouncementSaveDTO } from "@/types/announcement";
import TokenService from "./TokenService";

class AnnouncementService {
    path = '/announcement';

    getAll() {
        return AxiosService.get(this.path)
    }

    get(id: Number) {
        return AxiosService.get(`${this.path}/${id}`);
    }

    save(form: AnnouncementSaveDTO) {
        var formData = new FormData()
        formData.append("multipart_file", form.images)
        
        return AxiosService.post(`${this.path}/save`, form, {
            headers: {
                "Authorization": `Bearer ${TokenService.getToken()}`,
                "Content-Type": "multipart/form-data"
            },
            params: {
                "multipart_file": formData
            }
        })
    }

    update(form: AnnouncementSaveDTO) {
        return AxiosService.put(`${this.path}/save/${form.id}`, form, {
            headers: {
                "Authorization": `Bearer ${TokenService.getToken()}`
            }
        })
    }

    delete(id: number) {
        return AxiosService.delete(`${this.path}/${id}`)
    }

    getCities() {
        return AxiosService.get(`${this.path}/cities`)
    }

    getCityAndSubCategory(DTO: CityAndSubCategory) {
        return AxiosService.post(`${this.path}/city-and-sub-category`, DTO)
    }

    getByEmail(email: string) {
        return AxiosService.get(`${this.path}/by-email/${email}`, {
            headers: {
                "Authorization": `Bearer ${TokenService.getToken()}`
            }
        })
    }
}

export default new AnnouncementService();