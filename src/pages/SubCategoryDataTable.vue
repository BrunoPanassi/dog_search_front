<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="subCategories"
            :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title class="text-h6">{{ props.tableSelected }}</v-toolbar-title>
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
                            <v-select
                                v-model="selectedCategoryId"
                                label="Categoria"
                                :items="categories"
                                item-title="name"
                                item-value="id"
                            >
                            </v-select>
                            <v-text-field 
                            label="Nome"
                            hide-details="auto"
                            density="compact"
                            :disabled="!selectedCategoryId"
                            v-model="name"
                            ></v-text-field>
                        </template>
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <ActionButtons 
                            :cancel-title="'Cancel'" 
                            :confirm-title="'Save'"
                            :loading="loading"
                            :disable="!name.length && !selectedCategoryId"
                            @close="onCloseDialog()"
                            @confirm="onSaveItem()" 
                        />
                        </template>
                    </Dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <DataTableActionButtons 
                    @edit="onEditItem(item)" 
                    @delete="onDeleteDialog(item)" 
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
    </div>
</template>

<script lang="ts" setup>
import CategoryService from '@/service/CategoryService'
import SubCategoryService from '@/service/SubCategoryService';
import ActionButtons from '@/components/ActionButtons.vue'
import DataTableActionButtons from '@/components/DataTableActionButtons.vue'
import Dialog from '@/components/Dialog.vue'
import { IdAndName } from '@/types/idAndName';
import { SubCategory, SubCategorySaveDTO } from '@/types/subCategory';
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
    tableSelected: String
})

const onResetSubCategory = () => { return { id: 0, category: { id: 0, name: '' }, name: '' }}
const onResetSubCategorySaveForm = () => { return { name: '', categoryId: 0}}

let categories = ref<Array<IdAndName>>([]);
let subCategorySaveForm = ref<SubCategorySaveDTO>(onResetSubCategorySaveForm());
let name = ref<string>('');
let selectedCategoryId = ref<number>();

let selectedSubCategory = ref<SubCategory>(onResetSubCategory());
const selectedComputed = computed({
    get: () => selectedSubCategory.value,
    set: (val) => {
        selectedSubCategory.value = val
    }
})
const isOnUpdate = computed(() => selectedComputed.value.id !== 0)
const title = computed(() => !isOnUpdate.value ? 'New Item' : 'Edit Item')

const headers = [
  { title: "Id", key: "id" },
  { title: "Category", key: "category.name"},
  { title: "Name", key: "name"},
  { title: "Actions", key: "actions"}
];
let subCategories = ref<Array<SubCategory>>([]);

let loading = ref<boolean>(false);
const onLoading = () => { loading.value = !loading.value };

let dialog = ref<boolean>(false);
let deleteDialog = ref<boolean>(false);

const getSubCategories = async() => { 
    try {
        onLoading()
        subCategories.value = [];
        const { data } = await SubCategoryService.getAll()
        subCategories.value.push(...data)
    } catch (e) {
        console.error(e);
    } finally {
        onLoading()
    }
}

const getCategories = async() => { 
    try {
        onLoading()
        categories.value = [];
        const { data } = await CategoryService.getAll()
        categories.value.push(...data)
    } catch (e) {
        console.error(e);
    } finally {
        onLoading()
    }
}

const onSetSubCategoryAfterSave = () => {
    subCategorySaveForm.value.name = name.value;
    if(selectedCategoryId.value) subCategorySaveForm.value.categoryId = selectedCategoryId.value;
}

const onSaveSubCategory = async () => {
    try {
        onLoading();
        await SubCategoryService.save(subCategorySaveForm.value);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onUpdateSubCategory = async () => {
    try {
        onLoading();
        await SubCategoryService.update(selectedComputed.value);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onDeleteSubCategory = async () => {
    try {
        onLoading();
        await SubCategoryService.delete(selectedComputed.value.id);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onSaveItem = async () => {
    onSetSubCategoryAfterSave()
    if (isOnUpdate.value) {
        await onUpdateSubCategory()
    } else {
        await onSaveSubCategory()
    }
    onCloseDialog()
    await getSubCategories()
}

const onCloseDialog = () => {
    dialog.value = false
    deleteDialog.value = false
}

const onDeleteDialog = (item: SubCategory) => {
    selectedComputed.value = item
    deleteDialog.value = true
}

const onDeleteItem = async () => {
    await onDeleteSubCategory()
    await getSubCategories()
    onCloseDialog()
}

const onEditItem = async (item: SubCategory) => {
    name.value = item.name;
    selectedCategoryId.value = item.category.id;
    selectedComputed.value = item;
    dialog.value = !dialog.value 
}

const onNewItem = async () => {
    name.value = ""
    selectedComputed.value = onResetSubCategory()
    subCategorySaveForm.value = onResetSubCategorySaveForm()
    dialog.value = true
}

onMounted(async () => {
    await getCategories();
    await getSubCategories();
})

</script>