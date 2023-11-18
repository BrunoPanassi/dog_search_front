<template>
    <Dialog
        :dialog-clicked="dialog"
        :add-button="false"
        @on-dialog-clicked="onCloseDialog()"
        height="720px"
    >
        <template v-slot:title>
            {{ title }}
        </template>
        <template v-slot:content>
            <v-carousel>
                <v-carousel-item v-for="(image, i) in images"
                    :key="i"
                    :src="image"
                    cover
                ></v-carousel-item>
            </v-carousel>
            <p class="text-body-2 pa-2">
                {{ text }}
            </p>
            <p class="text-body-1 d-flex justify-end font-weight-bold text-light-green-darken-2">
                {{ phoneNumber }}
            </p>
            <p class="text-body-1 d-flex justify-end font-weight-bold">
                {{ personName }}
            </p>
        </template>
        <template v-slot:actions>
            <v-btn class="ml-2" variant="tonal" @click="onCloseDialog()">
                Voltar
            </v-btn>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue'
import { toRefs } from 'vue'

const props = defineProps({
    dialog: {type: Boolean, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    phoneNumber: { type: String, required: true},
    personName: { type: String, required: true},
    images: {type: Array<string>, required: true}
})
const { dialog, 
        title,
        images,
        phoneNumber,
        personName } = toRefs(props);
const emit = defineEmits(['onCloseDialog']);

const onCloseDialog = () => { 
    dialog.value = false 
    emit('onCloseDialog')
}
</script>