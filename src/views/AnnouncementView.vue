<template>
    <v-card class="mx-auto my-5" max-width="450">
        <v-data-table
            :headers="headers"
            :items="announcements"
            :loading="loading"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Anúncio</v-toolbar-title>
                    <AnnouncementDialog 
                        :id="id"
                        :announcement="announcement"
                        :dialog="dialog"
                        @on-close-dialog="onCloseDialog()"
                        @on-new-item="onNewItem()"
                    />
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <DataTableActionButtons 
                    @edit="onEditItem(item)" 
                    @delete="onDeleteDialog(item)" 
                />
            </template>
        </v-data-table>
        <Dialog 
            :dialog-clicked="deleteDialog" 
            @on-dialog-clicked="onCloseDialog()" 
            :add-button="false"
        >
            <template v-slot:title>
                Confirmar
            </template>
            <template v-slot:content>
                <p class="text-h6 text-center">Deseja excluir o registro?</p>
            </template>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <ActionButtons 
                    :cancel-title="'Cancel'" 
                    :confirm-title="'Delete'"
                    :loading="loading"
                    @close="onCloseDialog()"
                    @confirm="onDeleteItem()" 
                />
            </template>
        </Dialog>
    </v-card>
</template>

<script lang="ts" setup>
import AnnouncementService from '@/service/AnnouncementService';
import { ref, onMounted } from 'vue';
import { Announcement } from '@/types/announcement'
import TokenService from '@/service/TokenService';
import ActionButtons from '@/components/ActionButtons.vue'
import Dialog from '@/components/Dialog.vue'
import DataTableActionButtons from '@/components/DataTableActionButtons.vue'
import AnnouncementDialog from '@/pages/AnnouncementDialog.vue';

let loading = ref<boolean>(false);
const resetedAnnouncement = {
    id: 0,
    title: "",
    text: "",
    person: "",
    category: "",
    subCategoryId: 0,
    images: [""]

}
let announcement = ref<Announcement>(resetedAnnouncement);
let announcements = ref<Array<Announcement>>([]);

let dialog = ref<boolean>(false);
let deleteDialog = ref<boolean>(false);

let id = ref<number>(0);

const headers = [
    { title: "id", key: "id"},
    { title: "Título", key: "title" },
    { title: "Descrição", key: "text" },
    { title: "Actions", key: "actions"}
]

const onLoading = () => { loading.value = !loading.value };

const onCloseDialog = async () => {
    await getAnnouncements();
    dialog.value = false
    deleteDialog.value = false
}

const onDeleteDialog = (item: Announcement) => {
    id.value = item.id;
    deleteDialog.value = true
}

const onEditItem = async (item: Announcement) => { 
    id.value = item.id;
    announcement.value = item;
    dialog.value = true
}

const onNewItem = () => {
    id.value = 0;
    dialog.value = true;
}

const onDeleteItem = async () => {
    await onDeleteAnnouncement();
    await getAnnouncements();
    onCloseDialog();
}

const getAnnouncements = async() => {
    try {
        onLoading();
        const sub = TokenService.getSub()
        if (sub) {
            const { data } = await AnnouncementService.getByEmail(sub);
            announcements.value = data;
        }
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

const onDeleteAnnouncement = async () => {
    try {
        onLoading()
        await AnnouncementService.delete(id.value);
    } catch (e) {
        console.error(e);
    } finally {
        onLoading();
    }
}

onMounted(async() => {
    await getAnnouncements();
})
</script>