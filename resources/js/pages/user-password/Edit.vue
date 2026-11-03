<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordController from '@/actions/App/Http/Controllers/UserPasswordController';
import Heading from '@/components/Heading.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit } from '@/routes/password';
import { type BreadcrumbItem } from '@/types';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: edit().url,
    },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Password settings" />

        <h1 class="sr-only">Password Settings</h1>

        <SettingsLayout>
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    v-bind="PasswordController.update.form()"
                    :options="{
                        preserveScroll: true,
                    }"
                    reset-on-success
                    :reset-on-error="[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <UFormField
                        label="Current password"
                        name="current_password"
                        :error="errors.current_password"
                    >
                        <UInput
                            id="current_password"
                            name="current_password"
                            type="password"
                            class="w-full"
                            autocomplete="current-password"
                            placeholder="Current password"
                        />
                    </UFormField>

                    <UFormField
                        label="New password"
                        name="password"
                        :error="errors.password"
                    >
                        <UInput
                            id="password"
                            name="password"
                            type="password"
                            class="w-full"
                            autocomplete="new-password"
                            placeholder="New password"
                        />
                    </UFormField>

                    <UFormField
                        label="Confirm password"
                        name="password_confirmation"
                        :error="errors.password_confirmation"
                    >
                        <UInput
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            class="w-full"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                        />
                    </UFormField>

                    <div class="flex items-center gap-4">
                        <UButton
                            type="submit"
                            :loading="processing"
                            label="Save password"
                            data-test="update-password-button"
                        />

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p
                                v-show="recentlySuccessful"
                                class="text-sm text-muted"
                            >
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </Form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
