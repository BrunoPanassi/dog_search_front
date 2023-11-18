import { defineStore } from "pinia";
import { PersonStore } from "@/types/person";

const resetedUser = {
    id: 0,
    name: "",
    email: "",
    roles: [""] 
}

export const useUserStore = defineStore('user-store', {
    state: () => ({
        id: resetedUser.id,
        name: resetedUser.name,
        email: resetedUser.email,
        roles: resetedUser.roles
    }),
    getters: {
        userStored: (state) => state
    },
    actions: {
        setUserStore(user: PersonStore) {
            this.id = user.id
            this.name = user.name
            this.email = user.email
            this.roles = user.roles
        },
        resetUserStore() {
            this.id = resetedUser.id
            this.name = resetedUser.name
            this.email = resetedUser.email
            this.roles = resetedUser.roles
        }
    }
})