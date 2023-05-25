<template>
    <v-btn 
        color="green"
        :disabled="disable"
    >
        Procurar
    </v-btn>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const { disable } = defineProps({
    disable: Boolean
})
</script>