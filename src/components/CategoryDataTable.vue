<template>
    <v-card class="mx-auto my-5" max-width="350">
        <v-data-table
            :headers="headers"
            :items="categories"
            :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ tableSelected }}</v-toolbar-title>
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
                         <v-text-field 
                            label="Categoria"
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
                        >
                        </ActionButtons>
                       </template>
                    </Dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                    size="small"
                    class="me-2"
                    @click="onEditItem(item.raw)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    size="small"
                    @click="onDeleteDialog(item.raw)"
                >
                    mdi-delete
                </v-icon>
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
                >
                </ActionButtons>
            </template>
        </Dialog>
    </v-card>
</template>

<script lang="ts" setup>
import { useAdminTableSelectStore } from '@/store/adminTableSelect';
import { IdAndName } from '@/types/idAndName';
import { ref, computed, onMounted } from 'vue'
import CategorySerice from '@/service/CategoryService'
import Dialog from '@/components/Dialog.vue'
import ActionButtons from '@/components/ActionButtons.vue'

const headers = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name"},
  { title: "Actions", key: "actions"}
];

let categories = ref<Array<IdAndName>>([]);
let dialog = ref<boolean>(false);
let deleteDialog = ref<boolean>(false);

let name = ref<string>('');
let loading = ref<boolean>(false);

let selectedCategory = ref<IdAndName>({id: 0, name: ''});
const selectedComputed = computed({
    get: () => selectedCategory.value,
    set: (val) => {
        selectedCategory.value = val
    }
})
const isOnUpdate = computed(() => selectedComputed.value.id !== 0)
const title = computed(() => !isOnUpdate.value ? 'New Item' : 'Edit Item')

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return capitalize(adminTableSelectStore.whichTableWasSelected)
})
const onLoading = () => { loading.value = !loading.value };

const capitalize = (text: string) => { return `${text.charAt(0).toUpperCase()}${text.slice(1)}` }

const getCategories = async() => { 
    try {
        onLoading()
        categories.value = [];
        const { data } = await CategorySerice.getAll()
        categories.value.push(...data)
    } catch (e) {
        console.error(e);
    } finally {
        onLoading()
    }
}

const onSaveCategory = async () => {
    try {
        onLoading();
        await CategorySerice.save(selectedComputed.value);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onUpdateCategory = async () => {
    try {
        onLoading();
        await CategorySerice.update(selectedComputed.value);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onDeleteCategory = async () => {
    try {
        onLoading();
        await CategorySerice.delete(selectedComputed.value.id)
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onDeleteDialog = (item: IdAndName) => {
    selectedComputed.value = item
    deleteDialog.value = true
}

const onNewItem = () => {
    name.value = ""
    selectedComputed.value = { id: 0, name: ""}
    dialog.value = true
}

const onSaveItem = async () => {
    selectedComputed.value.name = name.value;
    if (isOnUpdate.value) {
        await onUpdateCategory();
    } else {
        await onSaveCategory();
    }
    onCloseDialog();
    await getCategories();
}

const onEditItem = (item: IdAndName) => { 
    name.value = item.name;
    selectedComputed.value = item;
    dialog.value = !dialog.value 
}

const onDeleteItem = async () => {
    await onDeleteCategory()
    await getCategories()
    onCloseDialog()
}

const onCloseDialog = () => {
    dialog.value = false
    deleteDialog.value = false
}

onMounted(async () => {
    await getCategories();
})

</script>