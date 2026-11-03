<script setup lang="ts">
type Props = {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
};

withDefaults(defineProps<Props>(), {
    variant: 'default',
});
</script>

<template>
    <header :class="variant === 'small' ? '' : 'mb-8 space-y-1'">
        <h2
            :class="
                variant === 'small'
                    ? 'mb-1 text-base font-semibold text-highlighted'
                    : 'text-xl font-semibold tracking-tight text-highlighted'
            "
        >
            {{ title }}
        </h2>
        <p v-if="description" class="text-sm text-muted">
            {{ description }}
        </p>
    </header>
</template>
