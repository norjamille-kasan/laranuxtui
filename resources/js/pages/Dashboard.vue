<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 overflow-x-auto">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <UCard
                    v-for="index in 3"
                    :key="index"
                    class="relative aspect-video overflow-hidden"
                    :ui="{ body: 'p-0 sm:p-0' }"
                >
                    <PlaceholderPattern />
                </UCard>
            </div>
            <UCard
                class="relative min-h-[100vh] flex-1 md:min-h-min"
                :ui="{ body: 'p-0 sm:p-0' }"
            >
                <PlaceholderPattern />
            </UCard>
        </div>
    </AppLayout>
</template>
