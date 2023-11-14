<template>
    <Dialog
            :dialog-clicked="newAccountDialog"
            :add-button="false"
            height="800px"
            @on-dialog-clicked="onCloseDialog()"
        >
            <template v-slot:title>
                Criar Nova Conta
            </template>
            <template v-slot:content>
                <LoginForm 
                    :already-registered="false" 
                    :toggle-confirm-button="confirmButton"
                    @on-loading="onLoading">
                </LoginForm>
            </template>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <ActionButtons 
                    :cancel-title="'Fechar'" 
                    :confirm-title="'Salvar'"
                    :loading="loading"
                    @close="onCloseDialog()"
                    @confirm="onConfirm" 
                />
            </template>
        </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue'
import { ref, toRefs } from 'vue';
import ActionButtons from '@/components/ActionButtons.vue';
import LoginForm from '@/components/login/LoginForm.vue';

const props = defineProps({
    newAccountDialog: {type: Boolean, required: true}
})

const { newAccountDialog } = toRefs(props);
const emit = defineEmits(['onCloseDialog']);
let confirmButton = ref<boolean>(false);
const toggleConfirmButton = () => confirmButton.value = !confirmButton.value;
const onLoading = (loadingFromForm:boolean) => loading.value = loadingFromForm

let loading = ref<boolean>(false);

const onCloseDialog = () => { 
    newAccountDialog.value = false 
    emit('onCloseDialog')
}

const onConfirm = () => {
    toggleConfirmButton()
}
</script>