<template>
     <v-select
        class="ml-2"
        v-for="(item, i) in menuItens"
        :label="item.title"
        :items="item.data"
        :disabled="item.disabled"
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
import SubCategoryService from '@/service/SubCategoryService'
import { onMounted, computed, ref } from 'vue';
import type { IdAndName } from '@/types/idAndName';

interface MenuItens {
  title: string
  icon: string
  data: Array<string>
  disabled: boolean
}

let cities = ref<Array<string>>([]);
let categories = ref<Array<string>>([]);
let subCategories = ref<Array<string>>([]);
const computedCities = computed<Array<string>>(() => cities.value);
const computedCategories = computed<Array<string>>(() => categories.value);
const computedSubCategories = computed<Array<string>>(() => subCategories.value);

const menuItens = ref<Array<MenuItens>>([
    {
      title: 'Cidade',
      icon: 'mdi-city',
      data: computedCities.value,
      disabled: false
    },
    {
      title: 'Categoria',
      icon: 'mdi-menu',
      data: computedCategories.value,
      disabled: false
    },
    {
      title: 'Sub-Categoria',
      icon: 'mdi-microsoft-xbox-controller-menu',
      data: computedSubCategories.value,
      disabled: false
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
    data = data.map((c:IdAndName) => c.name)
    categories.value.push(...data);
  } catch (e) {
    console.error(e);
  }
}

const getSubCategories = async () => {
  try {
    let { data } = await SubCategoryService.getAll();
    data = data.map((c:IdAndName) => c.name)
    subCategories.value.push(...data);
  } catch (e) {
    console.error(e);
  }
}

onMounted(async () => {
  await getCities();
  await getCategories();
  await getSubCategories();
})



</script>