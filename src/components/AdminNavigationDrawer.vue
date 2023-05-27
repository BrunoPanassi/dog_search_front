<template>
    <v-navigation-drawer
        v-model="drawerStore.getDrawer"
        location="left"
    >
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';

const drawerStore = useDrawerStore()
</script>