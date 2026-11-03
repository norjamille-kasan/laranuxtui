<script setup lang="ts">
type Props = {
    variant?: 'header' | 'sidebar';
    class?: string;
};

const props = defineProps<Props>();
</script>

<template>
    <div
        v-if="props.variant === 'sidebar'"
        class="flex flex-1 flex-col overflow-hidden"
        :class="props.class"
    >
        <slot name="header" />
        <main class="flex flex-1 flex-col overflow-y-auto p-4 sm:p-6">
            <slot />
        </main>
    </div>
    <main
        v-else
        class="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
        :class="props.class"
    >
        <slot />
    </main>
</template>
