<template>
    <v-btn 
        color="green"
        :disabled="disable"
        @click="$emit('clicked')"
    >
        Procurar
    </v-btn>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const { disable } = defineProps({
    disable: Boolean
})

const emit = defineEmits(['clicked'])
</script>