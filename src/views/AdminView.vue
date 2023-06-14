<template>
    <v-main>
        <v-card class="mx-auto my-5" max-width="350">
            <CategoryDataTable v-if="tableSelected == 'category'" :table-selected="capitalize(tableSelected)"></CategoryDataTable>
            <SubCategoryDataTable v-if="tableSelected == 'sub-category'" :table-selected="capitalize(tableSelected)"></SubCategoryDataTable>
        </v-card>
    </v-main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAdminTableSelectStore } from '@/store/adminTableSelect';
import CategoryDataTable from '@/components/CategoryDataTable.vue'
import SubCategoryDataTable from '@/pages/SubCategoryDataTable.vue';

const capitalize = (text: string) => { return `${text.charAt(0).toUpperCase()}${text.slice(1)}` }

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return adminTableSelectStore.whichTableWasSelected
})

</script>