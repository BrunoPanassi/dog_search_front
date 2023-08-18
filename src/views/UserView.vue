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
                        <div v-for="(item, i) in itens" :key="i">
                            <v-text-field 
                                v-if="item.type == 'text'"
                                :label="item.title"
                                hide-details="auto"
                                density="compact"
                                v-model="item.data"
                            ></v-text-field>
                            <v-select
                                v-else
                                :label="item.title"
                                :items="item.items"
                                :item-title="item.itemText"
                                :item-value="item.itemValue"
                                v-model="item.data"
                            >
                            </v-select>
                        </div>
                       </template>
                       <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <ActionButtons 
                            :cancel-title="'Cancel'" 
                            :confirm-title="'Save'"
                            :loading="loading"
                            :disable="!isAllItensFilled"
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

interface Item {
    title: string,
    data: string|number,
    items?: ComputedRef<Array<IdAndName>>,
    itemText?: string,
    itemValue?: string,
    type: string
}

let loading = ref<boolean>(false);
let subCategoryLoading = false;
const onLoading = () => { loading.value = !loading.value };

let announcements = ref<Array<Announcement>>([]);
const resetedAnnouncement = {
    id: 0,
    title: "",
    text: "",
    personId: 0, // TODO: Buscar person da pessoa logada
    subCategoryId: 0,
    images: [""]
}
let selectedAnnouncement = ref<AnnouncementSaveDTO>(resetedAnnouncement)

let title = ref<string>("");
let description = ref<string>("")
let category = ref<string>("");
let subCategory = ref<string>("");
let images = ref<Array<string>>([""])

let categories = ref<Array<IdAndName>>([]);
let subCategories = ref<Array<string>>([]);
const categoriesComputed = computed(() => categories.value)

const itens  = ref<Array<Item>>([
    {
        title: "Título",
        data: "",
        type: "text"
    },
    {
        title: "Descrição",
        data: "",
        type: "text"
    },
    {
        title: "Categoria",
        data: 0,
        type: "select",
        items: categoriesComputed,
        itemText: "name",
        itemValue: "id"
    },
    {
        title: "Sub-Categoria",
        data: selectedAnnouncement.value.subCategoryId,
        type: "select"
    }
])

const isAllItensFilled = computed(() => itens.value.filter(i => i.data))

const selectedAnnouncementComputed = computed({
    get: () => selectedAnnouncement.value,
    set: (val) => {
        selectedAnnouncement.value = val
    }
})

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
    // selectedComputed.value.name = name.value;
    // if (isOnUpdate.value) {
    //     await onUpdateCategory();
    // } else {
    //     await onSaveCategory();
    // }
    // onCloseDialog();
    // await getCategories();
}

const resetValues = () => {
    title.value = ""
    description.value = ""
    category.value = ""
    subCategory.value = ""
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
        await AnnouncementService.save(selectedAnnouncementComputed.value);
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
    data = data.map((c:IdAndName) => c.name)
    subCategories.value.splice(0);
    subCategories.value.push(...data);
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