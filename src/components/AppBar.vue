<template>
    <v-app-bar
        :color="appBarStore.getColor"
    >
        <v-app-bar-nav-icon variant="text" @click.stop="handleClickDrawer">
        </v-app-bar-nav-icon>
        <v-app-bar-title class="text-h6 text-white font-weight-bold">
            {{ appBarStore.getTitle }}
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <UserMenu @open-new-account="onNewAccount()"/>

        <Dialog
            :dialog-clicked="newAccountDialog"
            :add-button="false"
            @on-dialog-clicked="onCloseDialog()"
        >
            <template v-slot:title>
                Criar Nova Conta
            </template>
            <template v-slot:content>
                <v-form v-model="onValid" ref="form" validate-on="blur">
                    <v-row v-for="(prop, i) in textFieldLabels">
                        <v-select v-if="prop.type == 'select'"
                            :loading="loading"
                            :clearable="true"
                            :label="prop.label"
                            :items="prop.items"
                            v-model="prop.model"
                            :rules="prop.validation"
                            :prepend-inner-icon="prop.icon"
                            :item-title="prop.itemTitle"
                            :item-value="prop.itemValue"
                        >
                        </v-select>
                        <v-col v-else :key="i">
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
                    :confirm-title="'Salvar'"
                    :loading="loading"
                    :disable="!onValid"
                    @close="onCloseDialog()"
                    @confirm="onSaveNewAccount()" 
                />
            </template>
        </Dialog>
        
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';
import { useAppBarStore } from '@/store/appBar';
import UserMenu from '@/components/UserMenu.vue'
import Dialog from '@/components/Dialog.vue'
import { ref, onMounted, watch, computed, ComputedRef } from 'vue';
import ActionButtons from '@/components/ActionButtons.vue'
import AuthenticationService from '@/service/AuthenticationService';
import { Register } from '@/types/register';
import axios from 'axios';
interface CountryStates {
    id: number
    sigla: string
    nome: string
}

const drawerStore = useDrawerStore();
const appBarStore = useAppBarStore();

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}

let loading = ref<boolean>(false);
let onValid = ref<boolean>(false);
let name = ref<string>("");
let email = ref<string>("");
let password = ref<string>("");
let city = ref<string>("");
let neighbourhood = ref<string>("");
let phoneNumber = ref<string>("");
let state = ref();
let countryStates = ref<Array<CountryStates>>([]);
let countryCities = ref();

const form = ref();

const textFieldLabels = ref([
    {
        label: "Nome",
        model: name,
        type: "input",
        counter: 50,
        icon: "mdi-account",
        validation: [AuthenticationService.requiredField]
    },
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
    },
    {
        label: "Estado",
        items: countryStates,
        itemTitle: "nome",
        itemValue: "id",
        model: state,
        type: "select",
        counter: 20,
        icon: "mdi-city-variant",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Cidade",
        items: countryCities,
        itemTitle: "nome",
        itemValue: "nome",
        model: city,
        type: "select",
        counter: 20,
        icon: "mdi-city",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Bairro",
        model: neighbourhood,
        type: "input",
        counter: 30,
        icon: "mdi-home-group",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Telefone",
        model: phoneNumber,
        type: "input",
        counter: 15,
        icon: "mdi-phone",
        placeholder: "(99) 99999-9999",
        validation: [AuthenticationService.requiredField, AuthenticationService.isAValidPhoneNumber]
    }
])

let newAccountDialog = ref<boolean>(false);
const onNewAccount = () => { newAccountDialog.value = true }
const onCloseDialog = () => { newAccountDialog.value = false }

const onGetCityStates = async () => {
    const response = await fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
    const states = await response.json();
    countryStates.value = states;
}

const onGetCityByState = async () => {
    onLoading()
    const response = await fetch(`http://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/municipios`)
    const cities = await response.json();
    countryCities.value = cities;
    onLoading()
}

const onLoading = () => loading.value = !loading.value

const registerFieldValues: ComputedRef<Register> = computed(() => {
    return {
        name: name.value,
        city: city.value,
        neighbourhood: neighbourhood.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        email: email.value
    }
})

const onSaveNewAccount = async () => {
    try {
        onLoading();
        const { valid } = await form.value.validate()
        if (valid && onValid) {
            try {
                const { data } = await AuthenticationService.register(registerFieldValues.value);
                if (data) localStorage.setItem("token", data);
            } catch (error) {
                axios.isAxiosError(error) ? alert(error.response?.data) : console.error(error);
            }
        } else {
            alert("Its not valid")
        }
    } catch (e) {
        console.error(e)
    } finally {
        onLoading();
    }
}

watch(state, (currState, prevState) => {
    if (currState) {
        onGetCityByState();
    }
})

onMounted(async () => {
    await onGetCityStates();
})


</script>