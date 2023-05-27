import { defineStore } from "pinia";

export const useDrawerStore = defineStore('drawer', {
    state: () => ({
        drawer: false
    }),
    getters: {
        getDrawer: (state) => state.drawer
    },
    actions: {
        drawerClicked() {
            this.drawer = !this.drawer
        }
    }
})