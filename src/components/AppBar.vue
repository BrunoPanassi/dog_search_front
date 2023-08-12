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

</script>