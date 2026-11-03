<script setup lang="ts">
import type { AppShellVariant } from '@/types';

type Props = {
    variant?: AppShellVariant;
};

defineProps<Props>();
</script>

<template>
    <div v-if="variant === 'sidebar'" class="flex h-svh w-full overflow-hidden">
        <slot />
    </div>
    <div v-else class="flex min-h-screen w-full flex-col">
        <slot />
    </div>
</template>
