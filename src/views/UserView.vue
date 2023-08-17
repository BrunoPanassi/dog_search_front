<template>
    <v-main>
        <v-card class="mx-auto my-5" max-width="350">
            User View
        </v-card>
    </v-main>
</template>

<script lang="ts" setup>
import AnnouncementService from '@/service/AnnouncementService';
import { ref, onMounted } from 'vue';
import { Announcement } from '@/types/announcement'
import TokenService from '@/service/TokenService';

let loading = ref<boolean>(false);
const onLoading = () => { loading.value = !loading.value };

let announcements = ref<Array<Announcement>>([]);

const headers = [
    { title: "Título", key: "title" },
    { title: "Descrição", key: "text" }
]

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

onMounted(async() => {
    await getAnnouncements();
})
</script>