<template>
    <v-layout>
        <AppBar :color="appBar.color" :title="appBar.title"/>
    </v-layout>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';

const appBar = {
  color: "orange",
  title: "Test"
}
</script>