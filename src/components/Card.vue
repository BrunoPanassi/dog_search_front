<template>
    <v-card class="mx-auto my-5 elevation-4" max-width="344" height="344">
        <v-img
        :src=coverImage
        height="200px"
        ></v-img>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            {{ text }}
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="tonal" @click="onOpenPost">
                Ver Mais
            </v-btn>
        </v-card-actions>
        <PostDialog
            :dialog="dialog"
            :title="title"
            :text="text"
            :person-name="personName"
            :phone-number="phoneNumber"
            :images="images"
            @on-close-dialog="onClosePost"
        ></PostDialog>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import PostDialog from '@/pages/PostDialog.vue';

let dialog = ref<boolean>(false);

const props = defineProps({
    title: { type: String, required: true },
    text: { type: String, required: true },
    images: { type: Array<string>, required: true},
    phoneNumber: { type: String, required: true},
    personName: { type: String, required: true},
})

let { title, text, images } = toRefs(props);

let coverImage = computed(() => images.value.at(0) ?? "")

const onOpenPost = () => dialog.value = true;
const onClosePost = () => dialog.value = false;

</script>