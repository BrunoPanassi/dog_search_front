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
                        >
                            {{ item }}
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
        
    </v-app-bar>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';
import { useAppBarStore } from '@/store/appBar';

const drawerStore = useDrawerStore();
const appBarStore = useAppBarStore();

const handleClickDrawer = () => {
    drawerStore.drawerClicked()
}

const accountMenuItens = ["Configurações", "Criar Conta"]


</script>