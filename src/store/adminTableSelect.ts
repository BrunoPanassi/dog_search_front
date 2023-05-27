import { defineStore } from "pinia";

export const useAdminTableSelectStore = defineStore('admin-table-select', {
    state: () => ({
        adminTableClick: ""
    }),
    getters: {
        whichTableWasSelected: (state) => state.adminTableClick
    },
    actions: {
        tableSelect(tableSelected: string) {
            this.adminTableClick = tableSelected
        }
    }
})