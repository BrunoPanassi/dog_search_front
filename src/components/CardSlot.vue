<template>
    <v-card class="ma-2 align-self-center" elevation="8" min-width="400" min-height="300"> 
        <v-card-item>
            <slot name="top-button"></slot>
            <v-card-title class="pl-5">
                <slot name="title"></slot>
            </v-card-title>
            <v-card-text class="mt-2">
                <slot name="text"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card-item>
    </v-card>
</template>