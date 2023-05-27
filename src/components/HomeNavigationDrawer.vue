<template>
    <v-navigation-drawer
        v-model="drawerStore.getDrawer"
        location="left"
    >
        <Filter @clicked="handleClickDrawer"/>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import Filter from '@/components/Filter.vue'
import { useDrawerStore } from '@/store/drawer';

const drawerStore = useDrawerStore();

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}
</script>