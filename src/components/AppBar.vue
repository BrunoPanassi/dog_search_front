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
                                @update:model-value="updateModelValue"
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
import { ref, onMounted, watch } from 'vue';
import ActionButtons from '@/components/ActionButtons.vue'
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

const requiredField = (text: string) => !!text || "O campo é obrigatório"
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const brPhoneNumberRegex = /(\(\d{2}\))\s(\d{5})\-(\d{4})/
const validEmail = (text: string) => emailRegex.test(text) || "Formato inválido de e-mail"
const validPhoneNumber = (text: string) => brPhoneNumberRegex.test(text) || "Formato inválido de telefone"

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
        validation: [requiredField]
    },
    {
        label: "E-mail",
        model: email,
        type: "email",
        counter: 80,
        icon: "mdi-email",
        placeholder: "nome@email.com",
        validation: [requiredField, validEmail]
    },
    {
        label: "Senha",
        model: password,
        type: "password",
        icon: "mdi-form-textbox-password",
        counter: 30,
        validation: [requiredField]
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
        validation: [requiredField]
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
        validation: [requiredField]
    },
    {
        label: "Bairro",
        model: neighbourhood,
        type: "input",
        counter: 30,
        icon: "mdi-home-group",
        validation: [requiredField]
    },
    {
        label: "Telefone",
        model: phoneNumber,
        type: "input",
        counter: 15,
        icon: "mdi-phone",
        placeholder: "(99) 99999-9999",
        validation: [requiredField, validPhoneNumber]
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

const onSaveNewAccount = async () => {
    try {
        onLoading();
        const { valid } = await form.value.validate()
        if (valid && onValid) {
            alert("Its Valid")
        } else {
            alert("Its not valid")
        }
    } catch (e) {
        console.error(e)
    } finally {
        onLoading();
    }
}

const updateModelValue = (text: string) => console.log(text)

watch(state, (currState, prevState) => {
    console.log(currState)
    if (currState) {
        onGetCityByState();
    }
})

onMounted(async () => {
    await onGetCityStates();
})


</script>