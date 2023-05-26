<template>
     <v-select
        class="ml-2"
        v-for="(item, i) in menuItens"
        :label="item.title"
        :items="item.data"
        :disabled="item.disabled"
        :loading="item.loading"
        return-object
        :prepend-inner-icon="item.icon"
        flat
        @update:model-value="item.onChange"
    >
    </v-select>
    <CenterItem>
        <SearchButton :disable="!isAllItensSelected" @clicked="buttonClicked"/>
    </CenterItem>
</template>

<script lang="ts" setup>
import SearchButton from '@/components/SearchButton.vue'
import CenterItem from '@/components/CenterItem.vue'
import AnnouncementService from '@/service/AnnouncementService'
import CategoryService from '@/service/CategoryService';
import SubCategoryService from '@/service/SubCategoryService'
import { onMounted, computed, ref, ComputedRef } from 'vue';
import type { IdAndName } from '@/types/idAndName';
import type { Filter } from '@/types/filter';
import type { AnnouncementDTO } from '@/types/announcement.dto';

interface MenuItens {
  title: string
  icon: string
  data: Array<string>
  disabled: boolean | ComputedRef<boolean>
  onChange?: Function
  loading?: boolean
}

let city = ref<string>("");
let category = ref<string>("");
let subCategory = ref<string>("");

let cities = ref<Array<string>>([]);
let categories = ref<Array<string>>([]);
let subCategories = ref<Array<string>>([]);

let cityLoading = false;
let categoryLoading = false;
let subCategoryLoading = false;

let announcements: Array<AnnouncementDTO> = [];

const computedCities = computed<Array<string>>(() => cities.value);
const computedCategories = computed<Array<string>>(() => categories.value);
const computedSubCategories = computed<Array<string>>(() => subCategories.value);

const isCategorySelected = computed<boolean>(() => category.value.length == 0);
const itensSelected = computed<Filter>(() => {
  return {
    city: city.value,
    category: category.value,
    subCategory: subCategory.value
  }
})
const isAllItensSelected = computed<boolean>(() => Object.values(itensSelected.value).every((value:string) => !!value))

const onSelectCity = (citySelected: string) => { city.value = citySelected };
const onSelectCategory = async (categorySelected: string) => { 
  category.value = categorySelected;
  await getSubCategories();
};
const onSelectSubCategory = (subCategorySelected: string) => { subCategory.value = subCategorySelected };

const menuItens = ref<Array<MenuItens>>([
    {
      title: 'Cidade',
      icon: 'mdi-city',
      data: computedCities.value,
      disabled: false,
      onChange: onSelectCity,
      loading: cityLoading
    },
    {
      title: 'Categoria',
      icon: 'mdi-menu',
      data: computedCategories.value,
      disabled: false,
      onChange: onSelectCategory,
      loading: categoryLoading
    },
    {
      title: 'Sub-Categoria',
      icon: 'mdi-microsoft-xbox-controller-menu',
      data: computedSubCategories.value,
      disabled: isCategorySelected,
      onChange: onSelectSubCategory,
      loading: subCategoryLoading
    }
  ]);

const getCities = async () => {
  try {
    cityLoading = true;
    const { data } = await AnnouncementService.getCities();
    cities.value.push(...data);
  } catch (e) {
    console.error(e);
  } finally {
    cityLoading = false;
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
    subCategoryLoading = true;
    let { data } = await SubCategoryService.getByCategory(category.value);
    data = data.map((c:IdAndName) => c.name)
    subCategories.value.splice(0);
    subCategories.value.push(...data);
  } catch (e) {
    console.error(e);
  } finally {
    subCategoryLoading = false;
  }

}

const getAnnouncements = async () => {
  try {
    const { data } = await AnnouncementService.getCityAndSubCategory({
      city: city.value,
      subCategory: subCategory.value
    })
    announcements = data;
  } catch (e) {
    console.error(e)
  }
}

const buttonClicked = async () => { await getAnnouncements() }

onMounted(async () => {
  await getCities();
  await getCategories();
})



</script>