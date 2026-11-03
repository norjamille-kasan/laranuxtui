<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';

type Props = {
    collapsed?: boolean;
};

withDefaults(defineProps<Props>(), {
    collapsed: false,
});
</script>

<template>
    <div class="flex items-center gap-2 overflow-hidden">
        <div
            class="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md bg-primary text-inverted"
        >
            <AppLogoIcon class="size-5 fill-current" />
        </div>
        <div v-if="!collapsed" class="grid flex-1 text-left text-sm">
            <span class="truncate leading-tight font-semibold text-highlighted">
                Laravel Starter Kit
            </span>
        </div>
    </div>
</template>
