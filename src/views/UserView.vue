<template>
    <v-main>
        <v-btn 
            class="ma-5"
            @click="pushToPostsView()">
            Pagina inicial
        </v-btn>
        <AnnouncementView v-if="componentSelected == 'posts'" />
        <CenterItem v-else>
            Componente de configurações a ser construido
        </CenterItem>
    </v-main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AnnouncementView from '@/views/AnnouncementView.vue'
import { useComponentSelectStore } from '@/store/userComponentSelect';
import { useRouter } from 'vue-router';
import CenterItem from '@/components/CenterItem.vue';

const router = useRouter();

const pushToPostsView = () => router.push("/")

const userComponentSelect = useComponentSelectStore();
const componentSelected = computed(() => {
    return userComponentSelect.whichComponentWasSelected
})

</script>