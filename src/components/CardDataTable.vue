<template>
    <v-card class="mx-auto my-5" max-width="344">
        <v-card-title> {{ tableSelected }} </v-card-title>
    </v-card>
</template>

<script lang="ts" setup>
import { useAdminTableSelectStore } from '@/store/adminTableSelect';
import { computed } from 'vue'

const adminTableSelectStore = useAdminTableSelectStore()
const tableSelected = computed(() => {
    return capitalize(adminTableSelectStore.whichTableWasSelected)
})

const capitalize = (text: string) => { return `${text.charAt(0).toUpperCase()}${text.slice(1)}` }

</script>