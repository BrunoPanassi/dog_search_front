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
    <v-navigation-drawer
        v-model="drawer"
        location="left"
    >
        <Filter />
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import Filter from '@/components/Filter.vue'
import {ref} from 'vue';

const drawer = ref<boolean>(false);

const { color, title } = defineProps({
    color: { type: String, required: true},
    title: { type: String, required: true}
})

const handleClickDrawer = () => {
    drawer.value = !drawer.value
}


</script>