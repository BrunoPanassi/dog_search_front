<template>
    <v-layout>
        <v-app-bar
            color="orange"
        >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title class="text-h6 text-white font-weight-bold">Dogger</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn variant="text" icon="mdi-magnify"></v-btn>
            <v-btn variant="text" icon="mdi-filter"></v-btn>
            <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            location="left"
        >
            <v-list
            :items="menuItens"
            ></v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script lang="ts" setup>
    import {ref} from 'vue';
    const drawer = ref<boolean>(false);

    const menuItens = [
        {
          title: 'Cidade',
          value: 'Cidade',
        },
        {
          title: 'Categoria',
          value: 'Categoria',
        },
        {
          title: 'SubCategoria',
          value: 'SubCategoria',
        },
        {
          title: 'Serviços',
          value: 'Serviços',
        },
      ];
</script>