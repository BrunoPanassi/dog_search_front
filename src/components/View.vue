<template>
    <v-layout>
        <AppBar color="orange" title="Test" @click-drawer="handleDrawer"/> 
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
import AppBar from '@/components/AppBar.vue';
import {ref} from 'vue';

const drawer = ref<boolean>(false);

const handleDrawer = (drawerClicked: boolean) => {
  drawer.value = drawerClicked
}

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