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
    </v-main>
</template>

<script lang="ts" setup>
import Card from '@/components/Card.vue'
import { useAnnouncementStore } from '@/store/announcement';

const announcementStore = useAnnouncementStore();

</script>