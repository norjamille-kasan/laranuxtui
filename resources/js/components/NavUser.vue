<script setup lang="ts">
import UserMenu from '@/components/UserMenu.vue';
import type { User } from '@/types';

type Props = {
    user: User;
    collapsed?: boolean;
};

withDefaults(defineProps<Props>(), {
    collapsed: false,
});
</script>

<template>
    <UserMenu :user="user" :label="!collapsed" />
</template>
