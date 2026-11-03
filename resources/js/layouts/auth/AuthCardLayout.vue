<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
    >
        <div class="flex w-full max-w-md flex-col gap-6">
            <Link
                :href="home()"
                class="flex items-center gap-2 self-center font-medium"
            >
                <div class="flex h-9 w-9 items-center justify-center">
                    <AppLogoIcon class="size-9 fill-current text-highlighted" />
                </div>
            </Link>

            <UCard class="rounded-xl">
                <template #header>
                    <div class="text-center">
                        <h1 class="text-xl font-semibold text-highlighted">
                            {{ title }}
                        </h1>
                        <p v-if="description" class="mt-1 text-sm text-muted">
                            {{ description }}
                        </p>
                    </div>
                </template>

                <div class="px-4 py-2 sm:px-6">
                    <slot />
                </div>
            </UCard>
        </div>
    </div>
</template>
