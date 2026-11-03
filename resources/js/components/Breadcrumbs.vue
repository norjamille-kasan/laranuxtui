<script setup lang="ts">
import { computed } from 'vue';
import { toUrl } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs: BreadcrumbItem[];
};

const props = defineProps<Props>();

const items = computed(() =>
    props.breadcrumbs.map((item, index) => ({
        label: item.title,
        to: item.href ? toUrl(item.href) : undefined,
        active: index === props.breadcrumbs.length - 1,
    })),
);
</script>

<template>
    <UBreadcrumb :items="items" />
</template>
