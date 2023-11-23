<template>
    <v-main>
        <v-row>
            <v-col 
                v-for="(card, i) in announcementStore.getAnnouncements" :key="i" 
                cols="12" sm="6" md="4" lg="3" xl="3" xxl="2">
                <Card
                    :title="card.title" 
                    :text="card.text"
                    :images="card.images"
                    :person-name="card.personName"
                    :phone-number="card.phoneNumber"
                />
            </v-col>
        </v-row>
        <v-pagination
            v-model="page"
            :length="totalPages"
        >
        </v-pagination>
    </v-main>
</template>

<script lang="ts" setup>
import { ref, computed, ComputedRef, watch } from 'vue';
import Card from '@/components/Card.vue'
import { useAnnouncementStore } from '@/store/announcement';

const announcementStore = useAnnouncementStore();

let totalPages = computed(() => announcementStore.getTotalPages)

let page = ref<number>(1);

watch(page, (curr => {
    announcementStore.setPage(page.value)
}))

</script>