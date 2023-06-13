<template>
    <v-card class="mx-auto my-5" max-width="350">
        <v-data-table
            :headers="headers"
            :items="subCategories"
            :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ props.tableSelected }}</v-toolbar-title>
                    <v-spacer></v-spacer>
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
                                label="Categoria"
                                :items="categories"
                                item-title="name"
                                item-value="id"
                                return-object
                            >
                            </v-select>
                            <v-text-field 
                            label="Nome"
                            hide-details="auto"
                            density="compact"
                            v-model="name"

                            ></v-text-field>
                        </template>
                        <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <ActionButtons 
                            :cancel-title="'Cancel'" 
                            :confirm-title="'Save'"
                            :loading="loading"
                            :disable="!name.length"
                            @close="onCloseDialog()"
                            @confirm="onSaveItem()" 
                        />
                        </template>
                    </Dialog>
                </v-toolbar>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts" setup>
import CategoryService from '@/service/CategoryService'
import SubCategoryService from '@/service/SubCategoryService';
import ActionButtons from '@/components/ActionButtons.vue'
import Dialog from '@/components/Dialog.vue'
import { IdAndName } from '@/types/idAndName';
import { SubCategory } from '@/types/subCategory';
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
    tableSelected: String
})

let categories = ref<Array<IdAndName>>([]);
let selectedCategory = ref<IdAndName>({id: 0, name: ''});
let name = ref<string>('');

const onResetSubCategory = () => { return {id: 0, category: { id: 0, name: '' }, name: ''}}

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
    selectedComputed.value.name = name.value;
    selectedComputed.value.category = selectedCategory.value;
}

const onSaveSubCategory = async () => {
    try {
        onLoading();
        await SubCategoryService.save(selectedComputed.value);
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

const onSaveItem = async () => {
    onSetSubCategoryAfterSave()
    if (isOnUpdate.value) {
        await onUpdateSubCategory()
    } else {
        await onSaveSubCategory()
    }
    onCloseDialog()
    await getCategories()
}

const onCloseDialog = () => {
    dialog.value = false
    deleteDialog.value = false
}

const onNewItem = async () => {
    await getCategories()
    name.value = ""
    selectedComputed.value = onResetSubCategory()
    dialog.value = true
}

onMounted(async () => {
    await getSubCategories();
})

</script>