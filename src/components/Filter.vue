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
import AnnouncementService from '@/service/AnnouncementService'
import { onMounted, computed, ref } from 'vue';

interface MenuItens {
  title: string
  icon: string
  data: Array<string>
}

let cities = ref<Array<string>>([]);
const computedCities = computed<Array<string>>(() => cities.value);

const menuItens: Array<MenuItens> = [
    {
      title: 'Cidade',
      icon: 'mdi-city',
      data: cities.value
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

const getCities = async () => {
  try {
    const { data } = await AnnouncementService.getCities();
    cities.value.push(...data);
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  getCities();
})



</script>