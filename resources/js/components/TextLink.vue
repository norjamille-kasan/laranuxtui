<script setup lang="ts">
import type { LinkComponentBaseProps, Method } from '@inertiajs/core';
import { toUrl } from '@/lib/utils';

type Props = {
    href: LinkComponentBaseProps['href'];
    tabindex?: number;
    method?: Method;
    as?: string;
};

defineProps<Props>();
</script>

<template>
    <ULink
        :to="toUrl(href)"
        :tabindex="tabindex"
        :method="method"
        :as="as ?? 'a'"
        class="text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-primary"
    >
        <slot />
    </ULink>
</template>
