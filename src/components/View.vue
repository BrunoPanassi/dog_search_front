<template>
    <v-layout>
        <AppBar :color="appBar.color" :title="appBar.title"/>
        <MainView/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import MainView from '@/views/MainView.vue'

const appBar = {
  color: "orange",
  title: "Test"
}
</script>