<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { computed } from 'vue';
import { getInitials } from '@/composables/useInitials';
import { toUrl } from '@/lib/utils';
import { logout } from '@/routes';
import { edit } from '@/routes/user-profile';
import type { User } from '@/types';

type Props = {
    user: User;
    label?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    label: false,
});

const userAvatar = computed(() => ({
    src: props.user.avatar ?? undefined,
    alt: props.user.name,
    text: getInitials(props.user.name),
}));

const handleLogout = (): void => {
    router.flushAll();
    router.post(toUrl(logout()));
};

const items = computed(() => [
    [
        {
            type: 'label' as const,
            label: props.user.name,
            description: props.user.email,
            avatar: userAvatar.value,
        },
    ],
    [
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: toUrl(edit()),
        },
    ],
    [
        {
            label: 'Log out',
            icon: 'i-lucide-log-out',
            onSelect: handleLogout,
        },
    ],
]);
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'end', sideOffset: 8 }"
        :ui="{ content: 'min-w-56' }"
    >
        <UButton
            color="neutral"
            variant="ghost"
            :avatar="userAvatar"
            :label="label ? user.name : undefined"
            :trailing-icon="label ? 'i-lucide-chevrons-up-down' : undefined"
            :square="!label"
            :ui="label ? { trailingIcon: 'text-dimmed ms-auto' } : undefined"
            class="w-full overflow-hidden"
            data-test="sidebar-menu-button"
        />
    </UDropdownMenu>
</template>
