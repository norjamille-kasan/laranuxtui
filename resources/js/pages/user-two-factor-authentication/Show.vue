<script setup lang="ts">
import { Form, Head, setLayoutProps } from '@inertiajs/vue3';
import { onUnmounted, ref } from 'vue';
import Heading from '@/components/Heading.vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { disable, enable, show } from '@/routes/two-factor';
import type { BreadcrumbItem } from '@/types';

type Props = {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    requiresConfirmation: false,
    twoFactorEnabled: false,
});

defineOptions({
    layout: { app: AppLayout, settings: SettingsLayout },
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Two-Factor Authentication',
        href: show.url(),
    },
];

setLayoutProps('app', { breadcrumbs });

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => {
    clearTwoFactorAuthData();
});
</script>

<template>
    <Head title="Two-Factor Authentication" />

    <h1 class="sr-only">Two-Factor Authentication Settings</h1>

    <div class="space-y-6">
        <Heading
            variant="small"
            title="Two-Factor Authentication"
            description="Manage your two-factor authentication settings"
        />

        <div
            v-if="!twoFactorEnabled"
            class="flex flex-col items-start justify-start space-y-4"
        >
            <UBadge color="error" variant="subtle" label="Disabled" />

            <p class="text-muted">
                When you enable two-factor authentication, you will be prompted
                for a secure pin during login. This pin can be retrieved from a
                TOTP-supported application on your phone.
            </p>

            <div>
                <UButton
                    v-if="hasSetupData"
                    icon="i-lucide-shield-check"
                    label="Continue Setup"
                    @click="showSetupModal = true"
                />
                <Form
                    v-else
                    v-bind="enable.form()"
                    @success="showSetupModal = true"
                    #default="{ processing }"
                >
                    <UButton
                        type="submit"
                        icon="i-lucide-shield-check"
                        label="Enable 2FA"
                        :loading="processing"
                    />
                </Form>
            </div>
        </div>

        <div v-else class="flex flex-col items-start justify-start space-y-4">
            <UBadge color="success" variant="subtle" label="Enabled" />

            <p class="text-muted">
                With two-factor authentication enabled, you will be prompted for
                a secure, random pin during login, which you can retrieve from
                the TOTP-supported application on your phone.
            </p>

            <TwoFactorRecoveryCodes />

            <div class="relative inline">
                <Form v-bind="disable.form()" #default="{ processing }">
                    <UButton
                        type="submit"
                        color="error"
                        icon="i-lucide-shield-ban"
                        label="Disable 2FA"
                        :loading="processing"
                    />
                </Form>
            </div>
        </div>

        <TwoFactorSetupModal
            v-model:isOpen="showSetupModal"
            :requiresConfirmation="requiresConfirmation"
            :twoFactorEnabled="twoFactorEnabled"
        />
    </div>
</template>
