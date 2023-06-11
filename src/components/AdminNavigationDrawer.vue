<template>
    <v-navigation-drawer
        v-model="drawerStore.getDrawer"
        location="left"
    >
        <v-list density="compact">
            <v-list-subheader>TABELAS</v-list-subheader>
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
import { useAdminTableSelectStore } from '@/store/adminTableSelect'
import { onMounted } from 'vue';

const drawerStore = useDrawerStore()
const adminTableSelectStore = useAdminTableSelectStore()

const items = [
    {
        title: 'Category',
        value: 'category',
        icon: 'mdi-menu'
    },
    {
        title: 'Sub-Category',
        value: 'sub-category',
        icon: 'mdi-microsoft-xbox-controller-menu'
    }
]

const listClick = (itemClicked: string) => {
    adminTableSelectStore.tableSelect(itemClicked)
    drawerStore.drawerClicked()
}

onMounted(() => {
    drawerStore.drawerClicked()
})
</script>