<template>
    <v-card class="mx-auto my-5" max-width="350">
        <v-data-table
            :headers="headers"
            :items="categories"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ tableSelected }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <Dialog 
                        :dialog-clicked="dialog" 
                        @on-dialog-clicked="onCloseDialog()"
                        @on-new-clicked="onNewClicked()"
                    >
                       <template v-slot:title>
                        {{ title  }} 
                       </template>
                       <template v-slot:content>
                         <v-text-field 
                            label="Categoria"
                            hide-details="auto"
                            density="compact"
                            v-model="selectedCategory.name"
                         ></v-text-field>
                       </template>
                       <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red-darken-1"
                            variant="text"
                            @click="onCloseDialog()"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            color="green-darken-1"
                            variant="text"
                            :disabled="!selectedCategory.name"
                            @click="onSaveItem()"
                        >
                            Save
                        </v-btn>
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
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts" setup>
import { useAdminTableSelectStore } from '@/store/adminTableSelect';
import { IdAndName } from '@/types/idAndName';
import { ref, computed, onMounted } from 'vue'
import CategorySerice from '@/service/CategoryService'
import Dialog from '@/components/Dialog.vue'

const headers = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name"},
  { title: "Actions", key: "actions"}
];

let categories = ref<Array<IdAndName>>([]);
let dialog = ref<boolean>(false);
let selectedCategory: IdAndName;

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return capitalize(adminTableSelectStore.whichTableWasSelected)
})

const capitalize = (text: string) => { return `${text.charAt(0).toUpperCase()}${text.slice(1)}` }

const title = computed(() => selectedCategory.id !== 0 ? 'Edit Item' : 'New Item')

const getCategories = async() => { 
    try {
        const { data } = await CategorySerice.getAll()
        categories.value.push(...data)
    } catch (e) {
        console.error(e);
    }
}

const onNewClicked = () => {
    selectedCategory = { id: 0, name: ""}
    dialog.value = true
}

const onSaveItem = () => {
    console.log(selectedCategory)
}

const onEditItem = (item: IdAndName) => { 
    selectedCategory = item;
    dialog.value = !dialog.value 
}
const onCloseDialog = () => { dialog.value = false }

onMounted(async () => {
    await getCategories();
})

</script>