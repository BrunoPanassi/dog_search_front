<template>
    <div>
        <v-btn
            color="red-darken-1"
            variant="text"
            @click="onClose()"
        >
            {{ cancelTitle }}
        </v-btn>
        <v-btn
            color="green-darken-1"
            variant="text"
            :disabled="disable"
            :loading="loading"
            @click="onConfirm()"
        >
            {{ confirmTitle }}
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
    cancelTitle: { type: String, required: true },
    confirmTitle: { type: String, required: true },
    loading: { type: Boolean, required: true},
    disable: { type: Boolean, required: false, default: false}
})

const emit = defineEmits(['close', 'confirm'])

const onClose = () => { emit('close') }
const onConfirm = () => { emit('confirm') }

const { loading, disable } = toRefs(props)

</script>