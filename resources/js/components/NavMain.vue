<script setup lang="ts">
import { computed } from 'vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

type Props = {
    items: NavItem[];
    collapsed?: boolean;
};

const props = defineProps<Props>();

const { isCurrentUrl } = useCurrentUrl();

const navigationItems = computed(() =>
    props.items.map((item) => ({
        label: item.title,
        icon: item.icon,
        to: toUrl(item.href),
        active: isCurrentUrl(item.href),
    })),
);
</script>

<template>
    <UNavigationMenu
        :items="navigationItems"
        :collapsed="collapsed"
        orientation="vertical"
    />
</template>
