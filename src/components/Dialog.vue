<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                dark
                v-bind="props"
                @click="onNewClicked()"
                v-if="addButton"
            >
                Adicionar
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <div class="d-flex flex-row">
                    <slot name="title"></slot>
                    <v-spacer></v-spacer>
                    <v-icon @click.stop="onCloseDialog()">
                        mdi-close
                    </v-icon>
                </div>
            </v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'

let dialog = ref<boolean>(false);

const props = defineProps({
    dialogClicked: { type: Boolean, required: true},
    addButton: { type: Boolean, required: true, default: false}
})

const emit = defineEmits(['onDialogClicked', 'onNewClicked'])

const { dialogClicked, addButton } = toRefs(props);

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