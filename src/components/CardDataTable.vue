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
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="props"
                        >
                            Adicionar
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title> Dialog </v-card-title>
                        <v-btn @click.stop="dialog = false">
                            Close
                        </v-btn>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                size="small"
                class="me-2"
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
import { ref,computed, onMounted } from 'vue'
import CategorySerice from '@/service/CategoryService'

const headers = [
  { title: "Id", key: "id" },
  { title: "Name", key: "name"},
  { title: "Actions", key: "actions"}
];


let categories = ref<Array<IdAndName>>([]);
let dialog = ref<boolean>(false);

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return capitalize(adminTableSelectStore.whichTableWasSelected)
})

const capitalize = (text: string) => { return `${text.charAt(0).toUpperCase()}${text.slice(1)}` }

const getCategories = async() => { 
    try {
        const { data } = await CategorySerice.getAll()
        categories.value.push(...data)
    } catch (e) {
        console.error(e);
    }
}

onMounted(async () => {
    await getCategories();
})

</script>