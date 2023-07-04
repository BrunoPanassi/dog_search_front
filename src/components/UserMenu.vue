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
                    title="Usuário"
                    subtitle="Não logado"
                >
                <template v-slot:prepend>
                    <v-avatar>
                        <v-icon icon="mdi-account-off"></v-icon>
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
                <v-btn>Deslogar</v-btn>
                <v-btn>Logar</v-btn>
            </v-card-actions>
        </v-card>

        
    </v-menu>
</template>

<script lang="ts" setup>

const emit = defineEmits(["openNewAccount"]);


const accountMenuItens = [
    {
        label: "Configurações",
        function: () => {}
    },
    {
        label: "Criar Nova Conta",
        function: () => { emit("openNewAccount")}
    }
]

</script>