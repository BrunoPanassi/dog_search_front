<template>
    <v-main>
        <CategoryDataTable v-if="tableSelected == 'category'"></CategoryDataTable>
        <div v-else>
            Selecione uma tela no menu ao lado.
        </div>
    </v-main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAdminTableSelectStore } from '@/store/adminTableSelect';
import CategoryDataTable from '@/components/CategoryDataTable.vue'

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return adminTableSelectStore.whichTableWasSelected
})
</script>