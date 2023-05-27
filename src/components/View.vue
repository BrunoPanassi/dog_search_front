<template>
    <v-layout>
        <AppBar/>
        <HomeNavigationDrawer/>
        <MainView/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import HomeNavigationDrawer from '@/components/HomeNavigationDrawer.vue'
import MainView from '@/views/MainView.vue'

</script>