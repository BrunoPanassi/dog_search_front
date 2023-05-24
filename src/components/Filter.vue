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
import CategoryService from '@/service/CategoryService';
import { onMounted, computed, ref } from 'vue';
import type { Category } from '@/types/category.model';

interface MenuItens {
  title: string
  icon: string
  data: Array<string>
}

let cities = ref<Array<string>>([]);
let categories = ref<Array<string>>([]);
const computedCities = computed<Array<string>>(() => cities.value);
const computedCategories = computed<Array<string>>(() => categories.value);

const menuItens = ref<Array<MenuItens>>([
    {
      title: 'Cidade',
      icon: 'mdi-city',
      data: computedCities.value
    },
    {
      title: 'Categoria',
      icon: 'mdi-menu',
      data: computedCategories.value
    },
    {
      title: 'Sub-Categoria',
      icon: 'mdi-microsoft-xbox-controller-menu',
      data: ["Sub-Categoria 1", "Sub-Categoria 2"]
    }
  ]);

const getCities = async () => {
  try {
    const { data } = await AnnouncementService.getCities();
    cities.value.push(...data);
  } catch (e) {
    console.error(e);
  }
}

const getCategories = async () => {
  try {
    let { data } = await CategoryService.getAll();
    data = data.map((c:Category) => c.name)
    categories.value.push(...data);
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await getCities();
  await getCategories();
})



</script>