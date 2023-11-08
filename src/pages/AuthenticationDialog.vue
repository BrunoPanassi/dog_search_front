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
            <v-form v-model="onValid" ref="form" validate-on="blur">
                <v-row v-for="(prop, i) in textFieldLabels">
                    <v-col :key="i">
                        <v-text-field 
                            validate-on="blur"
                            :label="prop.label"
                            hide-details="auto"
                            density="compact"
                            :clearable="true"
                            :placeholder="prop.placeholder"
                            :prepend-inner-icon="prop.icon"
                            :counter="prop.counter"
                            :rules="prop.validation"
                            :type="prop.type"
                            v-model="prop.model"
                            ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </template>
        <template v-slot:actions>
                <v-spacer></v-spacer>
                <ActionButtons 
                    :cancel-title="'Fechar'" 
                    :confirm-title="'Logar'"
                    :loading="loading"
                    :disable="!onValid"
                    @close="onCloseDialog()"
                    @confirm="onAuthenticate()" 
                />
            </template>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from '@/components/Dialog.vue'
import { ref, toRefs, ComputedRef, computed } from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import { Authentication, AuthenticationResponse } from '@/types/authentication';
import ActionButtons from '@/components/ActionButtons.vue';
import TokenService from '@/service/TokenService';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { PersonStore } from '@/types/person';

const router = useRouter();
const userStore = useUserStore();

const props = defineProps({
    authenticationDialog: {type: Boolean, required: true}
})
const emit = defineEmits(['onCloseDialog']);

const { authenticationDialog } = toRefs(props);

let loading = ref<boolean>(false);
const onLoading = () => loading.value = !loading.value

let onValid = ref<boolean>(false);
const form = ref();

let email = ref<string>("");
let password = ref<string>("");

let auth = ref<AuthenticationResponse>({
    token: "",
    statusCode: "",
    message: "",
    personId: 0,
    email: "",
    name: ""
});

const textFieldLabels = ref([
    {
        label: "E-mail",
        model: email,
        type: "email",
        counter: 80,
        icon: "mdi-email",
        placeholder: "nome@email.com",
        validation: [AuthenticationService.requiredField, AuthenticationService.isAValidEmail]
    },
    {
        label: "Senha",
        model: password,
        type: "password",
        icon: "mdi-form-textbox-password",
        counter: 30,
        validation: [AuthenticationService.requiredField]
    }
])

const authenticationFieldValues: ComputedRef<Authentication> = computed(() => {
    return {
        password: password.value,
        email: email.value
    }
})

const setToken = (auth: AuthenticationResponse) => {
    if (auth.token) TokenService.setToken(auth.token)
}

const pushToUserView = () => router.push('user');

const setUserStore = (auth: AuthenticationResponse) => {
    const user: PersonStore = {
        id: auth.personId,
        name: auth.name,
        email: auth.email,
        roles: TokenService.getRoles() ?? [""]
    }
    userStore.setUserStore(user);
}

const onAuthenticate = async () => {
    const { valid } = await form.value.validate()
    if (valid && onValid) {
        try {
            onLoading()
            const { data } = await AuthenticationService.authenticate(authenticationFieldValues.value);
            onCloseDialog()
            setToken(data)
            pushToUserView()
            setUserStore(data)
        } catch (error) {
            axios.isAxiosError(error) ? alert(error.response?.data) : console.error(error);
        } finally {
            onLoading()
        }
    } else {
        alert("Campos não estão válidos, confira novamente.")
    }
}

const onCloseDialog = () => { 
    authenticationDialog.value = false 
    emit('onCloseDialog')
}
</script>