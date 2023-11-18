<template>
    <v-app-bar
        :color="appBarStore.getColor"
    >
        <v-app-bar-nav-icon variant="text" @click.stop="handleClickDrawer">
        </v-app-bar-nav-icon>
        <v-app-bar-title class="text-h6 text-white font-weight-bold">
            {{ appBarStore.getTitle }}
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <UserMenu 
            @open-new-account="onNewAccount()" 
            @on-authenticate="onAuthenticate()"
            @on-logout="onLogout()"
            @on-user-configuration="onUserConfiguration()"
        />

        <RegisterDialog 
            :new-account-dialog="registerDialog" 
            @on-close-dialog="onCloseRegisterDialog"
        />
        <AuthenticationDialog
            :authentication-dialog="authenticationDialog"
            @on-close-dialog="onCloseAuthenticationDialog"
        />
        
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';
import { useAppBarStore } from '@/store/appBar';
import UserMenu from '@/components/UserMenu.vue'
import { ref } from 'vue';
import RegisterDialog from '@/pages/RegisterDialog.vue';
import AuthenticationDialog from '@/pages/AuthenticationDialog.vue';
import TokenService from '@/service/TokenService';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';

const router = useRouter();
const userStore = useUserStore();
const drawerStore = useDrawerStore();
const appBarStore = useAppBarStore();

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}

let registerDialog = ref<boolean>(false);
const onNewAccount = () => { registerDialog.value = true }
const onCloseRegisterDialog = () => { registerDialog.value = false }

let authenticationDialog = ref<boolean>(false);
const onAuthenticate = () => { authenticationDialog.value = true }
const onCloseAuthenticationDialog = () => { authenticationDialog.value = false }

const onUserConfiguration = () => router.push('user')

const onLogout = () => {
    TokenService.signOut()
    userStore.resetUserStore();
    router.push('/')
}

</script>