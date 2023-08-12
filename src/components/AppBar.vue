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
        <UserMenu @open-new-account="onNewAccount()"/>

        <RegisterDialog 
            :new-account-dialog="newAccountDialog" 
            @on-close-dialog="onCloseDialog"
        />
        
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';
import { useAppBarStore } from '@/store/appBar';
import UserMenu from '@/components/UserMenu.vue'
import { ref } from 'vue';
import RegisterDialog from '@/pages/RegisterDialog.vue';

const drawerStore = useDrawerStore();
const appBarStore = useAppBarStore();

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}

let newAccountDialog = ref<boolean>(false);
const onNewAccount = () => { newAccountDialog.value = true }
const onCloseDialog = () => { newAccountDialog.value = false }

</script>