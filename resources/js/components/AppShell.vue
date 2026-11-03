<script setup lang="ts">
import type { AppShellVariant } from '@/types';

type Props = {
    variant?: AppShellVariant;
};

defineProps<Props>();
</script>

<template>
    <UDashboardGroup
        v-if="variant === 'sidebar'"
        storage="local"
        storage-key="dashboard-sidebar"
    >
        <slot />
    </UDashboardGroup>
    <div v-else class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
</template>
