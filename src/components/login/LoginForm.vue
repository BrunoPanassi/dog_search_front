<template>
    <v-form v-model="onValid" ref="form" validate-on="blur">
        <v-row v-for="(prop, i) in textFieldLabels" :key="i">
            <v-select v-if="prop.type == 'select' && showRegisterFieldsOnlyIfIsNotAlreadyRegistered(prop.onlyForRegister)" 
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
                <template v-slot:prepend-item>
                    <v-text-field
                        label="Filtro"
                        placeholder="Digite aqui o filtro"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        v-model="prop.filter">
                    </v-text-field>
                </template>
            </v-select>
            <v-col v-else-if="prop.type != 'select' && showRegisterFieldsOnlyIfIsNotAlreadyRegistered(prop.onlyForRegister)" >
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
                    v-maska:[prop.mask]>
                </v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts" setup>
import { ref, computed, ComputedRef, watch, toRefs, onMounted } from 'vue'
import { Authentication, AuthenticationResponse } from '@/types/authentication';
import { Register } from '@/types/register';
import AuthenticationService from '@/service/AuthenticationService';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';
import { PersonStore } from '@/types/person';
import TokenService from '@/service/TokenService';

interface CountryStates {
    id: number
    sigla: string
    nome: string
}

interface CountryCities {
    nome: string
}

const props= defineProps({
    toggleConfirmButton: {type: Boolean, required: true},
    alreadyRegistered: {type: Boolean, required: true}
})
const { toggleConfirmButton, alreadyRegistered } = toRefs(props);
const emit = defineEmits(['onLoading'])

const router = useRouter();
const userStore = useUserStore();

let onValid = ref<boolean>(false);
const form = ref();
let loading = ref<boolean>(false);

let name = ref<string>("");
let email = ref<string>("");
let password = ref<string>("");
let city = ref<string>("");
let cityFilter = ref<string>("");
let neighbourhood = ref<string>("");
let phoneNumber = ref<string>("");
const phoneNumberMask = { mask: "(##) #####-####"};
let state = ref();
let stateFilter = ref<string>("");
let countryStates = ref<Array<CountryStates>>([]);
let countryCities = ref<Array<CountryCities>>([]);

const showRegisterFieldsOnlyIfIsNotAlreadyRegistered = (onlyForRegister: boolean) => {
    if (onlyForRegister && alreadyRegistered.value) return false;
    return true;
}

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

const statesFiltered = computed(() => countryStates.value.filter((state: CountryStates) => stateFilter.value ? state.nome.includes(stateFilter.value) : state))
const citiesFiltered = computed(() => countryCities.value.filter((city: CountryCities) => cityFilter.value ? city.nome.includes(cityFilter.value) : city))

const onLoading = () => loading.value = !loading.value
const emitLoading = () => emit('onLoading', loading.value)

const textFieldLabels = ref([
    {
        label: "Nome",
        model: name,
        type: "input",
        onlyForRegister: true,
        counter: 50,
        icon: "mdi-account",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "E-mail",
        model: email,
        type: "email",
        onlyForRegister: false,
        counter: 80,
        icon: "mdi-email",
        placeholder: "nome@email.com",
        validation: [AuthenticationService.requiredField, AuthenticationService.isAValidEmail]
    },
    {
        label: "Senha",
        model: password,
        type: "password",
        onlyForRegister: false,
        icon: "mdi-form-textbox-password",
        counter: 30,
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Estado",
        items: statesFiltered,
        itemTitle: "nome",
        itemValue: "id",
        model: state,
        filter: stateFilter,
        type: "select",
        onlyForRegister: true,
        counter: 20,
        icon: "mdi-city-variant",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Cidade",
        items: citiesFiltered,
        itemTitle: "nome",
        itemValue: "nome",
        model: city,
        filter: cityFilter,
        type: "select",
        onlyForRegister: true,
        counter: 20,
        icon: "mdi-city",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Bairro",
        model: neighbourhood,
        type: "input",
        onlyForRegister: true,
        counter: 30,
        icon: "mdi-home-group",
        validation: [AuthenticationService.requiredField]
    },
    {
        label: "Telefone",
        model: phoneNumber,
        type: "input",
        onlyForRegister: true,
        counter: 15,
        icon: "mdi-phone",
        placeholder: "(99) 99999-9999",
        mask: phoneNumberMask,
        validation: [AuthenticationService.requiredField, AuthenticationService.isAValidPhoneNumber]
    }
])

const authenticationFieldValues: ComputedRef<Authentication> = computed(() => {
    return {
        password: password.value,
        email: email.value
    }
})

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

const getDataFromAuthenticateOrRegister = (isRegister: boolean) => {
    if (isRegister) return AuthenticationService.register(registerFieldValues.value);
    return AuthenticationService.authenticate(authenticationFieldValues.value);
}

const onAuthenticateOrRegister = async (isRegister: boolean) => {
    try {
        onLoading()
        emitLoading()
        const { data } = await getDataFromAuthenticateOrRegister(isRegister);
        setToken(data)
        pushToUserView()
        setUserStore(data)
    } catch (error) {
        axios.isAxiosError(error) ? alert(error.response?.data) : console.error(error);
    } finally {
        onLoading()
        emitLoading()
    }
}

const setToken = (auth: AuthenticationResponse) => {
    if (auth.token) TokenService.setToken(auth.token)
}

const pushToUserView = () => router.push('user');

const getRoles = () => TokenService.getRoles() ?? [""]

const setUserStore = (auth: AuthenticationResponse) => {
    const user: PersonStore = {
        id: auth.personId,
        name: auth.name,
        email: auth.email,
        roles: getRoles()
    }
    userStore.setUserStore(user);
}

const isFormvalid = async () => {
    const { valid } = await form.value.validate()
    if (valid && onValid) return true;
    return false;
}

watch(toggleConfirmButton, async () => {
    const toRegister = false;
    const toAuthenticate = true;
    if (await isFormvalid()) {
        if (alreadyRegistered.value) onAuthenticateOrRegister(toRegister);
        else onAuthenticateOrRegister(toAuthenticate);
    } else {
        alert("Campos não estão válidos, confira novamente.");
    }
})

watch(state, (currState) => {
    if (currState) {
        onGetCityByState();
    }
})

onMounted(async () => {
    await onGetCityStates();
})
</script>