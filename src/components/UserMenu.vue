<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn 
                variant="text" 
                icon="mdi-account"
                v-bind="props"
            ></v-btn>
        </template>

        <v-card min-width="300">
            <v-list>
                <v-list-item
                    :title="userTitle()"
                    :subtitle="userSubtitle"
                >
                <template v-slot:prepend>
                    <v-avatar>
                        <v-icon v-if="userLoggedIn" icon="mdi-account"></v-icon>
                        <v-icon v-else icon="mdi-account-off"></v-icon>
                    </v-avatar>
                </template>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    v-for="(item, index) in accountMenuItens"
                    :key="index"
                >
                <v-list-item-title>
                    <v-btn 
                        class="text-none text-subtitle-1" 
                        variant="flat"
                        @click="item.function"
                    >
                        {{ item.label }}
                    </v-btn>
                </v-list-item-title>
                </v-list-item>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onLogout">Deslogar</v-btn>
                <v-btn @click="onAuthenticate">Logar</v-btn>
            </v-card-actions>
        </v-card>

        
    </v-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
const emit = defineEmits(["openNewAccount", "onAuthenticate", "onLogout", "onUserConfiguration"]);

const onAuthenticate = () => emit("onAuthenticate");
const onLogout = () => emit("onLogout");

const userLoggedIn = computed(() => !!userStore.name)
const userSubtitle = computed(() => userStore.email)
const userTitle = () => userLoggedIn.value ? userStore.name : "Não Logado"


const accountMenuItens = [
    {
        label: "Configurações",
        function: () => { emit("onUserConfiguration") }
    },
    {
        label: "Criar Nova Conta",
        function: () => { emit("openNewAccount")}
    }
]

</script>