import { AnnouncementDTO } from "@/types/announcement.dto";
import { Pageable } from "@/types/pageable";
import { defineStore } from "pinia";

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        announcements: [] as Array<AnnouncementDTO>,
        pagination: {
            page: 0,
            pageSize: 8,
            totalPages: 0
        } as Pageable
    }),
    getters: {
        getAnnouncements: (state) => state.announcements,
        getPage: (state) => state.pagination.page,
        getPageSize: (state) => state.pagination.pageSize,
        getTotalPages: (state) => state.pagination.totalPages
    },
    actions: {
        setAnnnouncements(announcements: Array<AnnouncementDTO>) {
            this.announcements = announcements;
        },
        setPage(page: number) {
            this.pagination.page = page;
        },
        setTotalPages(total: number) {
            this.pagination.totalPages = total;
        }
    }
})