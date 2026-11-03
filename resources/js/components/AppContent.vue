<script setup lang="ts">
type Props = {
    variant?: 'header' | 'sidebar';
    class?: string;
};

const props = defineProps<Props>();
</script>

<template>
    <UDashboardPanel
        v-if="props.variant === 'sidebar'"
        id="main"
        :class="props.class"
    >
        <template v-if="$slots.header" #header>
            <slot name="header" />
        </template>
        <template #body>
            <slot />
        </template>
    </UDashboardPanel>
    <main
        v-else
        class="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
        :class="props.class"
    >
        <slot />
    </main>
</template>
