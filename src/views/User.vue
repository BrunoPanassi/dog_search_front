<template>
    <v-layout>
        <AppBar/>
        <UserNavigationDrawer/>
        <UserView/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import UserNavigationDrawer from '@/components/UserNavigationDrawer.vue'
import UserView from '@/views/UserView.vue'
</script>