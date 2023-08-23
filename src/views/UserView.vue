<template>
    <v-main>
        <v-card class="mx-auto my-5" max-width="450">
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
                                    :disabled="item.disable"
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
                <DataTableActionButtons 
                    @edit="onEditItem(item.raw)" 
                    @delete="onDeleteDialog(item.raw)" 
                />
            </template>
        </v-data-table>
        <Dialog 
            :dialog-clicked="deleteDialog" 
            @on-dialog-clicked="onCloseDialog()" 
            :add-button="false"
        >
            <template v-slot:title>
                Confirmar
            </template>
            <template v-slot:content>
                <p class="text-h6 text-center">Deseja excluir o registro?</p>
            </template>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <ActionButtons 
                    :cancel-title="'Cancel'" 
                    :confirm-title="'Delete'"
                    :loading="loading"
                    @close="onCloseDialog()"
                    @confirm="onDeleteItem()" 
                />
           </template>
        </Dialog>
        </v-card>
    </v-main>
</template>

<script lang="ts" setup>
import AnnouncementService from '@/service/AnnouncementService';
import { ref, computed, onMounted, ComputedRef } from 'vue';
import { Announcement } from '@/types/announcement'
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
    column: string
    items?: ComputedRef<Array<IdAndName>>
    itemText?: string
    itemValue?: string
    onChange?: Function
    loading?: boolean
    validation: Array<(text: string) => string | true>
    disable: boolean | ComputedRef<boolean>
    type: string
}

let onValid = ref<boolean>(false);
const form = ref();

let loading = ref<boolean>(false);
let subCategoryLoading = false;
const onLoading = () => { loading.value = !loading.value };
const userStore = useUserStore();

let announcements = ref<Array<Announcement>>([]);

let id = ref<number>(0);
let title = ref<string>("");
let description = ref<string>("")
let category = ref<string>("");
let images = ref<Array<string>>([""])

let categories = ref<Array<IdAndName>>([]);
let subCategories = ref<Array<IdAndName>>([]);
const categoriesComputed = computed(() => categories.value)
const subCategoriesComputed = computed(() => subCategories.value)

const onSelectCategory = async(categorySelected: string) => {
    onUpdateCategory(categorySelected)
    onResetSubCategory()
    await getSubCategories()
}

const onUpdateCategory = (categorySelected: string) => {
    category.value = categorySelected;
}

const onResetSubCategory = () => {
    itens.value.forEach(i => {
         if (i.column == "subCategoryId") i.data = 0;
    })
}

const isCategorySelected = computed<boolean>(() => category.value.length == 0);

const itens = ref<Array<Item>>([
    {
        title: "Título",
        data: "",
        column: "title",
        type: "text",
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Descrição",
        data: "",
        column: "text",
        type: "text",
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Categoria",
        data: "",
        column: "category",
        type: "select",
        items: categoriesComputed,
        itemText: "name",
        itemValue: "name",
        onChange: onSelectCategory,
        disable: false,
        validation: [AuthenticationService.requiredField]
    },
    {
        title: "Sub-Categoria",
        data: 0,
        column: "subCategoryId",
        type: "select",
        items: subCategoriesComputed,
        itemText: "name",
        itemValue: "id",
        loading: subCategoryLoading,
        disable: isCategorySelected,
        validation: [AuthenticationService.requiredField]
    }
])

const itensValues = computed(() => {
    return {
        title: itens.value.find(i => i.column == "title")?.data,
        text: itens.value.find(i => i.column == "text")?.data,
        subCategoryId: itens.value.find(i => i.column == "subCategoryId")?.data,
        images: [""]
    }
})

const itensForm = () => {
    const title = itensValues.value.title ?? ""
    const text = itensValues.value.text ?? ""
    const personId = userStore.userStored.id
    const subCategory = Number(itensValues.value.subCategoryId)
    const images = [""]
    return {
        id: id.value,
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
    { title: "id", key: "id"},
    { title: "Título", key: "title" },
    { title: "Descrição", key: "text" },
    { title: "Actions", key: "actions"}
]

const onCloseDialog = () => {
    dialog.value = false
    deleteDialog.value = false
}

const onNewItem = async () => {
    resetValues()
    dialog.value = true
    await getCategories()
}

const onSaveItem = async () => {
    if (itensForm().id) {
        await onUpdateAnnouncement()
    } else {
        await onSaveAnnouncement();
    }
    onCloseDialog();
    await getAnnouncements();
}

const onEditItem = async (item: Announcement) => { 
    id.value = item.id;
    onResetValuesBySelectedValues(item)
    onSetCategoryAndSubCategoryOnEdit(item.category)
    dialog.value = true
}

const onDeleteItem = async () => {
    await onDeleteAnnouncement();
    await getAnnouncements();
    onCloseDialog();
}

const onResetValuesBySelectedValues = (item: Announcement) => {
    const entries = Object.entries(item);
    itens.value.forEach(i => i.data = entries.find(e => e[0] == i.column)?.[1])
}

const onSetCategoryAndSubCategoryOnEdit = async (categorySelected: string) => {
    await getCategories();
    onUpdateCategory(categorySelected)
    await getSubCategories();
}

const onDeleteDialog = (item: Announcement) => {
    id.value = item.id;
    deleteDialog.value = true
}

const resetValues = () => {
    id.value = 0;
    category.value = "";
    itens.value.forEach(i => i.data = "");
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

const onUpdateAnnouncement = async () => {
    try {
        onLoading()
        await AnnouncementService.update(itensForm());
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onDeleteAnnouncement = async () => {
    try {
        onLoading()
        await AnnouncementService.delete(id.value);
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