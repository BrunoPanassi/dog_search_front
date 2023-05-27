<template>
    <v-layout>
        <AppBar/>
        <AdminNavigationDrawer/>
        <AdminView/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import AdminNavigationDrawer from '@/components/AdminNavigationDrawer.vue'
import AdminView from '@/views/AdminView.vue'
</script>