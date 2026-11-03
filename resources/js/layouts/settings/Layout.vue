<script setup lang="ts">
import { computed } from 'vue';
import Heading from '@/components/Heading.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editPassword } from '@/routes/password';
import { show } from '@/routes/two-factor';
import { edit as editProfile } from '@/routes/user-profile';
import { type NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
        icon: 'i-lucide-user',
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: 'i-lucide-lock',
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: 'i-lucide-shield-check',
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: 'i-lucide-sun-moon',
    },
];

const { isCurrentUrl } = useCurrentUrl();

const navigationItems = computed(() =>
    sidebarNavItems.map((item) => ({
        label: item.title,
        icon: item.icon,
        to: toUrl(item.href),
        active: isCurrentUrl(item.href),
    })),
);
</script>

<template>
    <div>
        <Heading
            title="Settings"
            description="Manage your profile and account settings"
        />

        <div class="flex flex-col lg:flex-row lg:space-x-12">
            <aside class="w-full max-w-xl lg:w-48">
                <UNavigationMenu
                    :items="navigationItems"
                    orientation="vertical"
                    aria-label="Settings"
                />
            </aside>

            <USeparator class="my-6 lg:hidden" />

            <div class="flex-1 md:max-w-2xl">
                <section class="max-w-xl space-y-12">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>
