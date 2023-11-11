<template>
    <CenterPage>
        <template v-slot:content>
            <LoginCard />
        </template>
    </CenterPage> 
</template>

<script lang="ts" setup>
import LoginCard from '@/components/login/LoginCard.vue'
import CenterPage from '@/components/CenterPage.vue'
</script>