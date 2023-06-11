<template>
    <div>
        <v-icon
            size="small"
            class="me-2"
            @click="onEdit()"
        >
            mdi-pencil
        </v-icon>
        <v-icon
            size="small"
            @click="onDelete()"
        >
            mdi-delete
        </v-icon>
    </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['edit', 'delete'])

const onEdit = () => { emit('edit') }
const onDelete = () => { emit('delete') }

</script>