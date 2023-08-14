<template>
    <v-layout>
        <AppBar/>
        <AdminNavigationDrawer/>
        <UserView/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import AdminNavigationDrawer from '@/components/AdminNavigationDrawer.vue'
import UserView from '@/views/UserView.vue'
</script>