<template>
    <v-main>
        <Card
            v-for="(card) in announcementStore.getAnnouncements"
            :title="card.title" 
            :text="card.text"
            :images="card.images"
            :person-name="card.personName"
            :phone-number="card.phoneNumber"
            :price="2000"
        />
    </v-main>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useAnnouncementStore } from '@/store/announcement';

const announcementStore = useAnnouncementStore();

</script>