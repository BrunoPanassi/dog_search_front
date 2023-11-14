<template>
    <CardSlot>
        <template v-slot:top-button>
            <div class="d-flex align-end flex-column">
                <v-btn variant="text" @click="toogleAlreadyRegistered()">
                    {{ alreadyRegisteredButton }}
                </v-btn>
            </div>
        </template>
        <template v-slot:title>
            {{ alreadyRegisteredTitle }}
        </template>
        <template v-slot:text>
            <LoginForm 
                :already-registered="alreadyRegistered" 
                :toggle-confirm-button="confirmButton"
                @on-loading="onLoading">
            </LoginForm>
        </template>
        <template v-slot:actions>
            <v-row align="center" justify="center">
                <v-btn variant="outlined" color="green" @click="onConfirm" :loading="loading">
                    {{ alreadyRegisteredActionButton }}
                </v-btn>
            </v-row>
        </template>
    </CardSlot>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CardSlot from '@/components/CardSlot.vue';
import LoginForm from '@/components/login/LoginForm.vue';

let loading = ref<boolean>(false);
let confirmButton = ref<boolean>(false);
let alreadyRegistered = ref<boolean>(false);
const toogleAlreadyRegistered = () => alreadyRegistered.value = !alreadyRegistered.value
const alreadyRegisteredButton = computed(() => alreadyRegistered.value ? 'Cadastrar-se' : 'Já tenho conta')
const alreadyRegisteredTitle = computed(() => alreadyRegistered.value ? 'Login' : 'Cadastrar')
const alreadyRegisteredActionButton = computed(() => alreadyRegistered.value ? 'Logar' : 'Cadastrar')

const onLoading = (loadingFromForm:boolean) => loading.value = loadingFromForm
const toggleConfirmButton = () => confirmButton.value = !confirmButton.value;

const onConfirm = () => {
    toggleConfirmButton()
}
</script>