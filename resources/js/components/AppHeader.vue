<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import UserMenu from '@/components/UserMenu.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const props = withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const page = usePage();
const auth = computed(() => page.props.auth);
const { isCurrentUrl } = useCurrentUrl();
const isMobileMenuOpen = ref(false);

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'i-lucide-layout-grid',
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: 'i-lucide-folder',
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: 'i-lucide-book-open',
    },
];

const mainNavigationItems = computed(() =>
    mainNavItems.map((item) => ({
        label: item.title,
        icon: item.icon,
        to: toUrl(item.href),
        active: isCurrentUrl(item.href),
    })),
);

const rightNavigationItems = computed(() =>
    rightNavItems.map((item) => ({
        label: item.title,
        icon: item.icon,
        to: toUrl(item.href),
        target: '_blank',
    })),
);
</script>

<template>
    <div>
        <div class="border-b border-default">
            <UContainer class="flex h-16 items-center gap-4">
                <UButton
                    class="lg:hidden"
                    icon="i-lucide-menu"
                    color="neutral"
                    variant="ghost"
                    aria-label="Open navigation menu"
                    @click="isMobileMenuOpen = true"
                />

                <Link :href="dashboard()" class="flex items-center gap-x-2">
                    <AppLogo />
                </Link>

                <UNavigationMenu
                    :items="mainNavigationItems"
                    class="hidden lg:flex"
                />

                <div class="ml-auto flex items-center gap-1">
                    <UButton
                        icon="i-lucide-search"
                        color="neutral"
                        variant="ghost"
                        aria-label="Search"
                    />

                    <template v-for="item in rightNavItems" :key="item.title">
                        <UTooltip :text="item.title" class="hidden lg:flex">
                            <UButton
                                :to="toUrl(item.href)"
                                target="_blank"
                                :icon="item.icon"
                                color="neutral"
                                variant="ghost"
                                :aria-label="item.title"
                            />
                        </UTooltip>
                    </template>

                    <UserMenu :user="auth.user" />
                </div>
            </UContainer>
        </div>

        <div
            v-if="props.breadcrumbs.length > 1"
            class="w-full border-b border-default"
        >
            <UContainer class="flex h-12 items-center">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </UContainer>
        </div>

        <USlideover v-model:open="isMobileMenuOpen" title="Navigation Menu">
            <template #body>
                <div class="flex h-full flex-col justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <AppLogoIcon class="size-6 fill-current" />
                    </div>

                    <UNavigationMenu
                        :items="mainNavigationItems"
                        orientation="vertical"
                        class="flex-1"
                    />

                    <UNavigationMenu
                        :items="rightNavigationItems"
                        orientation="vertical"
                    />
                </div>
            </template>
        </USlideover>
    </div>
</template>
