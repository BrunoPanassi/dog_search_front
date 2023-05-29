<template>
    <v-card class="mx-auto my-5" max-width="344">
        <v-data-table
            :headers="headers"
            :items="categories"
        >
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