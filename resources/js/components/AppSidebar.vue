<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { watch } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { useSidebar } from '@/composables/useSidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'i-lucide-layout-grid',
    },
];

const page = usePage();
const { isOpen, closeOnMobile } = useSidebar();

watch(() => page.url, closeOnMobile);
</script>

<template>
    <USidebar
        v-model:open="isOpen"
        collapsible="icon"
        :ui="{ container: 'h-full' }"
    >
        <template #header="{ state, close }">
            <div class="flex w-full items-center gap-2 overflow-hidden">
                <Link
                    :href="dashboard()"
                    class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden"
                >
                    <AppLogo :collapsed="state === 'collapsed'" />
                </Link>
                <UButton
                    v-if="state === 'expanded'"
                    icon="i-lucide-x"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    square
                    aria-label="Close sidebar"
                    @click="close"
                />
            </div>
        </template>

        <template #default="{ state }">
            <NavMain :items="mainNavItems" :collapsed="state === 'collapsed'" />
        </template>

        <template #footer="{ state }">
            <NavUser
                :user="page.props.auth.user"
                :collapsed="state === 'collapsed'"
            />
        </template>
    </USidebar>
</template>
