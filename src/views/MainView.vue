<template>
    <v-main>
        <Card
            v-for="(card) in cards"
            :title="card.title" 
            :subtitle="card.subtitle"
            :price="card.price"
        />
    </v-main>
</template>

<script lang="ts" setup>

import Card from '@/components/Card.vue'

const cards = [
    {
        title: "Lorem Ipsum",
        subtitle: "lorem ipsum sit dolor amet...",
        price: 2000
    },
    {
        title: "Lorem Ipsum",
        subtitle: "lorem ipsum sit dolor amet...",
        price: 2000
    },
    {
        title: "Lorem Ipsum",
        subtitle: "lorem ipsum sit dolor amet...",
        price: 2000
    },
    {
        title: "Lorem Ipsum",
        subtitle: "lorem ipsum sit dolor amet...",
        price: 2000
    }
]
</script>