<template>
     <v-select
        class="ml-2"
        v-for="(item, i) in menuItens"
        :label="item.title"
        :items="item.data"
        :prepend-inner-icon="item.icon"
        flat
    >
    </v-select>
    <CenterItem>
        <SearchButton/>
    </CenterItem>
</template>

<script lang="ts" setup>
import SearchButton from '@/components/SearchButton.vue'
import CenterItem from '@/components/CenterItem.vue'

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