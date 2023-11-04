<template>
    <v-sheet class="d-flex justify-center align-center" color="orange" height="100vh">
        <v-card class="ma-2 align-self-center" elevation="8" width="400" height="330">
            <v-card-item>
                <div class="d-flex align-end flex-column">
                    <v-btn variant="text">Cadastrar-se</v-btn>
                </div>
                <v-card-title class="pl-5">
                    Login
                </v-card-title>
                <v-card-text class="mt-2">
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
                </v-card-text>
                <v-card-actions>
                    <v-row align="center" justify="center">
                        <v-btn variant="outlined" color="green">Logar</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card-item>
        </v-card>
    </v-sheet>   
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AuthenticationService from '@/service/AuthenticationService';

let onValid = ref<boolean>(false);

const form = ref();
let email = ref<string>("");
let password = ref<string>("");
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
</script>