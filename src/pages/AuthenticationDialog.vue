<template>
    <Dialog
            :dialog-clicked="authenticationDialog"
            :add-button="false"
            @on-dialog-clicked="onCloseDialog()"
    >
        <template v-slot:title>
            Logar
        </template>
        <template v-slot:content>
            <v-row>
                <v-col>
                    <LoginForm 
                        :already-registered="true" 
                        :toggle-confirm-button="confirmButton"
                        @on-loading="onLoading">
                    </LoginForm>
                </v-col>
            </v-row>
        </template>
        <template v-slot:actions>
                <v-spacer></v-spacer>
                <ActionButtons 
                    :cancel-title="'Fechar'" 
                    :confirm-title="'Logar'"
                    :loading="loading"
                    @close="onCloseDialog()"
                    @confirm="onConfirm()" 
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
    authenticationDialog: {type: Boolean, required: true}
})
const emit = defineEmits(['onCloseDialog']);
const { authenticationDialog } = toRefs(props);

let confirmButton = ref<boolean>(false);
const toggleConfirmButton = () => confirmButton.value = !confirmButton.value;
let loading = ref<boolean>(false);
const onLoading = (loadingFromForm:boolean) => loading.value = loadingFromForm

const onConfirm = () => {
    toggleConfirmButton()
}

const onCloseDialog = () => { 
    authenticationDialog.value = false 
    emit('onCloseDialog')
}
</script>