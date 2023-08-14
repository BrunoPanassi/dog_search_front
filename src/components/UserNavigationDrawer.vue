<template>
    <v-navigation-drawer
        v-model="drawerStore.getDrawer"
        location="left"
    >
        <v-list density="compact">
            <v-list-subheader>Items</v-list-subheader>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :title="item.title"
                :value="item.value"
                @click="listClick(item.value)"
            >
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDrawerStore } from '@/store/drawer';
import { useComponentSelectStore } from '@/store/userComponentSelect';
import { onMounted } from 'vue';

const drawerStore = useDrawerStore()
const userComponentSelectStore = useComponentSelectStore()

const items = [
    {
        title: 'Configurações',
        value: 'configuration',
        icon: 'mdi-account'
    },
    {
        title: 'Postagens',
        value: 'posts',
        icon: 'mdi-post'
    }
]

const listClick = (itemClicked: string) => {
    userComponentSelectStore.componentSelect(itemClicked)
    drawerStore.drawerClicked()
}

onMounted(() => {
    drawerStore.drawerClicked()
})
</script>