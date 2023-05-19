<template>
    <v-card class="mx-auto my-5" max-width="344">
        <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
        cover
        ></v-img>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            {{ subtitle }}
        </v-card-text>
        <v-card-actions>
            <p class="font-weight-bold text-light-green-darken-2">
                {{ `R$ ${price}` }}
            </p>
            <v-spacer></v-spacer>
            <v-btn variant="tonal">
                Ver Mais
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>

const { title, subtitle } = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: Number, required: true}
})

</script>