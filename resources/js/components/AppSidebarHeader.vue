<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useSidebar } from '@/composables/useSidebar';
import type { BreadcrumbItem } from '@/types';

withDefaults(
    defineProps<{
        breadcrumbs?: BreadcrumbItem[];
    }>(),
    {
        breadcrumbs: () => [],
    },
);

const { toggle } = useSidebar();
</script>

<template>
    <header
        class="flex h-(--ui-header-height) shrink-0 items-center gap-3 border-b border-default px-4"
    >
        <UButton
            icon="i-lucide-panel-left"
            color="neutral"
            variant="ghost"
            aria-label="Toggle sidebar"
            @click="toggle"
        />
        <Breadcrumbs
            v-if="breadcrumbs && breadcrumbs.length > 0"
            :breadcrumbs="breadcrumbs"
        />
    </header>
</template>
