import { defineStore } from "pinia";
import { PersonStore } from "@/types/person";

export const useUserStore = defineStore('user-store', {
    state: () => ({
        id: 0,
        name: "",
        email: ""
    }),
    getters: {
        userStored: (state) => state
    },
    actions: {
        setUserStore(user: PersonStore) {
            this.id = user.id
            this.name = user.name
            this.email = user.email
        }
    }
})