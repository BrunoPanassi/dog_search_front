import { defineStore } from "pinia";

export const useAppBarStore = defineStore('appBar', {
    state: () => ({
        color: 'orange',
        title: 'Title'
    }),
    getters: {
        getColor: (state) => state.color,
        getTitle: (state) => state.title
    }
})