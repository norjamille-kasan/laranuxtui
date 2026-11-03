<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import type { Appearance } from '@/types';

const { appearance, updateAppearance } = useAppearance();

const tabs: { value: Appearance; icon: string; label: string }[] = [
    { value: 'light', icon: 'i-lucide-sun', label: 'Light' },
    { value: 'dark', icon: 'i-lucide-moon', label: 'Dark' },
    { value: 'system', icon: 'i-lucide-monitor', label: 'System' },
];
</script>

<template>
    <div class="inline-flex gap-1 rounded-lg bg-elevated p-1">
        <UButton
            v-for="tab in tabs"
            :key="tab.value"
            :icon="tab.icon"
            :label="tab.label"
            :color="appearance === tab.value ? 'primary' : 'neutral'"
            :variant="appearance === tab.value ? 'solid' : 'ghost'"
            size="sm"
            @click="updateAppearance(tab.value)"
        />
    </div>
</template>
