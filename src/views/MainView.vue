<template>
    <v-main>
        <Card
            v-for="(card) in announcementStore.getAnnouncements"
            :title="card.title" 
            :subtitle="card.text"
            :price="2000"
        />
    </v-main>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useAnnouncementStore } from '@/store/announcement';

const announcementStore = useAnnouncementStore();

</script>