<template>
    <v-app-bar
        :color="color"
    >
        <v-app-bar-nav-icon variant="text" @click.stop="handleClickDrawer">
        </v-app-bar-nav-icon>
        <v-app-bar-title class="text-h6 text-white font-weight-bold">
            {{ title }}
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-magnify"></v-btn>
        <v-btn variant="text" icon="mdi-filter"></v-btn>
        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    <HomeNavigationDrawer/>
</template>

<script lang="ts" setup>
import HomeNavigationDrawer from '@/components/HomeNavigationDrawer.vue'
import { useDrawerStore } from '@/store/drawer';
const drawerStore = useDrawerStore();

const { color, title } = defineProps({
    color: { type: String, required: true},
    title: { type: String, required: true}
})

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}


</script>