<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'i-lucide-layout-grid',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: 'i-lucide-folder',
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: 'i-lucide-book-open',
    },
];

const user = usePage().props.auth.user;
</script>

<template>
    <UDashboardSidebar
        collapsible
        :default-size="18"
        :min-size="14"
        :max-size="26"
        :ui="{ footer: 'border-t border-default' }"
    >
        <template #header="{ collapsed }">
            <Link
                :href="dashboard()"
                class="flex w-full items-center gap-2 overflow-hidden"
            >
                <AppLogo :collapsed="collapsed" />
            </Link>
        </template>

        <template #default="{ collapsed }">
            <NavMain :items="mainNavItems" :collapsed="collapsed" />
            <NavFooter
                :items="footerNavItems"
                :collapsed="collapsed"
                class="mt-auto"
            />
        </template>

        <template #footer="{ collapsed }">
            <NavUser :user="user" :collapsed="collapsed" />
        </template>
    </UDashboardSidebar>
</template>
