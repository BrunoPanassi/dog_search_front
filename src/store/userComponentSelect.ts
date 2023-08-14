import { defineStore } from "pinia";

export const useComponentSelectStore = defineStore('user-component-select', {
    state: () => ({
        componentSelected: ''
    }),
    getters: {
        whichComponentWasSelected: (state) => state.componentSelected
    },
    actions: {
        componentSelect(componentSelected: string) {
            this.componentSelected = componentSelected
        }
    }
})