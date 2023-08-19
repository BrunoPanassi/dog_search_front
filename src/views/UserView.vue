<template>
    <v-main>
        <v-card class="mx-auto my-5" max-width="350">
            <v-data-table
            :headers="headers"
            :items="announcements"
            :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Anúncio</v-toolbar-title>
                    <Dialog 
                        :dialog-clicked="dialog"
                        :add-button="true" 
                        @on-dialog-clicked="onCloseDialog()"
                        @on-new-clicked="onNewItem()"
                    >
                       <template v-slot:title>
                            {{ title }}
                       </template>
                       <template v-slot:content>
                        <v-form v-model="onValid" ref="form" validate-on="blur">
                            <v-row v-for="(item, i) in itens" :key="i">
                                <v-text-field 
                                    v-if="item.type == 'text'"
                                    :label="item.title"
                                    hide-details="auto"
                                    density="compact"
                                    v-model="item.data"
                                    :rules="item.validation"
                                ></v-text-field>
                                <v-select
                                    v-else
                                    :label="item.title"
                                    :items="item.items"
                                    :item-title="item.itemText"
                                    :item-value="item.itemValue"
                                    :loading="item.loading"
                                    v-model="item.data"
                                    :rules="item.validation"
                                    @update:model-value="item.onChange"
                                >
                                </v-select>
                            </v-row>
                        </v-form>
                       </template>
                       <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <ActionButtons 
                            :cancel-title="'Cancel'" 
                            :confirm-title="'Save'"
                            :loading="loading"
                            :disable="!onValid"
                            @close="onCloseDialog()"
                            @confirm="onSaveItem()" 
                        />
                       </template>
                    </Dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <!-- <DataTableActionButtons 
                    @edit="onEditItem(item.raw)" 
                    @delete="onDeleteDialog(item.raw)" 
                /> -->
            </template>
        </v-data-table>
        </v-card>
    </v-main>
</template>

<script lang="ts" setup>
import AnnouncementService from '@/service/AnnouncementService';
import { ref, computed, onMounted, ComputedRef } from 'vue';
import { Announcement, AnnouncementSaveDTO } from '@/types/announcement'
import type { IdAndName } from '@/types/idAndName';
import TokenService from '@/service/TokenService';
import ActionButtons from '@/components/ActionButtons.vue'
import Dialog from '@/components/Dialog.vue'
import DataTableActionButtons from '@/components/DataTableActionButtons.vue'
import CategoryService from '@/service/CategoryService';
import SubCategoryService from '@/service/SubCategoryService'
import { useUserStore } from '@/store/userStore';
import AuthenticationService from '@/service/AuthenticationService';

interface Item {
    title: string
    data: string|number
    items?: ComputedRef<Array<IdAndName>>
    itemText?: string
    itemValue?: string
    onChange?: Function
    loading?: boolean
    validation: Array<(text: string) => string | true>
    type: string
}

let onValid = ref<boolean>(false);
const form = ref();

let loading = ref<boolean>(false);
let subCategoryLoading = false;
const onLoading = () => { loading.value = !loading.value };
const userStore = useUserStore();

let announcements = ref<Array<Announcement>>([]);
const resetedAnnouncement = {
    id: 0,
    title: "",
    text: "",
    personId: 0,
    subCategoryId: 0,
    images: [""]
}
let selectedAnnouncement = ref<AnnouncementSaveDTO>(resetedAnnouncement)
const selectedAnnouncementComputed = computed({
    get: () => selectedAnnouncement.value,
    set: (val) => {
        selectedAnnouncement.value = val
    }
})

let title = ref<string>("");
let description = ref<string>("")
let category = ref<string>("");
let subCategory = ref<number>(0);
let images = ref<Array<string>>([""])

let categories = ref<Array<IdAndName>>([]);
let subCategories = ref<Array<IdAndName>>([]);
const categoriesComputed = computed(() => categories.value)
const subCategoriesComputed = computed(() => subCategories.value)

const onSelectCategory = async(categorySelected: string) => {
    category.value = categorySelected
    await getSubCategories()
}

const onSelectSubCategory = async(subCategorySelected: number) => {
    subCategory.value = subCategorySelected
}

const itens = ref<Array<Item>>([
    {
        title: "Título",
        data: "",
        type: "text",
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Descrição",
        data: "",
        type: "text",
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Categoria",
        data: 0,
        type: "select",
        items: categoriesComputed,
        itemText: "name",
        itemValue: "name",
        onChange: onSelectCategory,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Sub-Categoria",
        data: 0,
        type: "select",
        items: subCategoriesComputed,
        itemText: "name",
        itemValue: "id",
        onChange: onSelectSubCategory,
        loading: subCategoryLoading,
        validation: [AuthenticationService.requiredField]
    }
])

const itensValues = computed(() => {
    return {
        id: 0,
        title: itens.value.find(i => i.title == "Título")?.data,
        text: itens.value.find(i => i.title == "Descrição")?.data,
        subCategoryId: subCategory.value,
        images: [""]
    }
})

const itensForm = () => {
    const title = itensValues.value.title ?? ""
    const text = itensValues.value.text ?? ""
    const personId = userStore.userStored.id
    const subCategory = itensValues.value.subCategoryId
    const images = [""]
    return {
        id: 0,
        title: title.toString(),
        text: text.toString(),
        personId: personId,
        subCategoryId: subCategory,
        images: images
    }
}

let dialog = ref<boolean>(false);
let deleteDialog = ref<boolean>(false);

const headers = [
    { title: "Título", key: "title" },
    { title: "Descrição", key: "text" }
]

const onCloseDialog = () => {
    dialog.value = false
    deleteDialog.value = false
}

const onNewItem = async () => {
    resetValues()
    selectedAnnouncementComputed.value = resetedAnnouncement
    dialog.value = true
    await getCategories()
}

const onSaveItem = async () => {
    onLoading();
    await onSaveAnnouncement();
    onLoading();
}

const resetValues = () => {
    title.value = ""
    description.value = ""
    category.value = ""
    subCategory.value = 0
}

const getAnnouncements = async() => {
    try {
        onLoading();
        const sub = TokenService.getSub()
        if (sub) {
            const { data } = await AnnouncementService.getByEmail(sub);
            announcements.value = data;
        }
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onSaveAnnouncement = async () => {
    try {
        onLoading();
        await AnnouncementService.save(itensForm());
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const getCategories = async () => {
  try {
    let { data } = await CategoryService.getAll();
    categories.value = data;
  } catch (e) {
    console.error(e);
  }
}

const getSubCategories = async () => {
  try {
    subCategoryLoading = true;
    let { data } = await SubCategoryService.getByCategory(category.value);
    subCategories.value = data;
  } catch (e) {
    console.error(e);
  } finally {
    subCategoryLoading = false;
  }
}

onMounted(async() => {
    await getAnnouncements();
})
</script>