<template>
    <v-layout>
        <v-app-bar
            color="orange"
        >
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title class="text-h6 text-white font-weight-bold">
              Title
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
          <v-select
            class="ml-2"
            v-for="(item, i) in menuItens"
            :label="item.title"
            :items="item.data"
            :prepend-inner-icon="item.icon"
            flat
          >
          </v-select>
          <div class="d-flex justify-center align-center">
            <v-btn color="green">
              Procurar
            </v-btn>
          </div>
        </v-navigation-drawer>
    </v-layout>
</template>

<script lang="ts" setup>
    import {ref} from 'vue';
    const drawer = ref<boolean>(false);

    const menuItens = [
        {
          title: 'Cidade',
          icon: 'mdi-city',
          data: ["Araçatuba", "Birigui"]
        },
        {
          title: 'Categoria',
          icon: 'mdi-menu',
          data: ["Categoria 1", "Categoria 2"]
        },
        {
          title: 'Sub-Categoria',
          icon: 'mdi-microsoft-xbox-controller-menu',
          data: ["Sub-Categoria 1", "Sub-Categoria 2"]
        }
      ];
</script>