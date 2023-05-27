import { AnnouncementDTO } from "@/types/announcement.dto";
import { defineStore } from "pinia";

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        announcements: [] as Array<AnnouncementDTO>
    }),
    getters: {
        getAnnouncements: (state) => state.announcements
    },
    actions: {
        setAnnnouncements(announcements: Array<AnnouncementDTO>) {
            this.announcements = announcements;
        }
    }
})