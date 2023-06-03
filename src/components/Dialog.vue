<template>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let dialog = ref<boolean>(false);

</script>