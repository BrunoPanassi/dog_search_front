<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                dark
                v-bind="props"
                @click="onNewClicked()"
            >
                Adicionar
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <slot name="title"></slot>
            </v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
            <v-btn @click.stop="onCloseDialog()">
                Close
            </v-btn>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'

let dialog = ref<boolean>(false);

const props = defineProps({
    dialogClicked: Boolean
})

const emit = defineEmits(['onDialogClicked', 'onNewClicked'])

const { dialogClicked } = toRefs(props);

const onNewClicked = () => {
    emit('onNewClicked')
}

const onCloseDialog = () => { 
    dialog.value = false
    emit('onDialogClicked')
}

watch(dialogClicked, (currDialog) => {
    dialog.value = currDialog
})

</script>