<script setup lang="ts">
import { Form, Head, Link, usePage } from '@inertiajs/vue3';
import ProfileController from '@/actions/App/Http/Controllers/UserProfileController';
import DeleteUser from '@/components/DeleteUser.vue';
import Heading from '@/components/Heading.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { edit } from '@/routes/user-profile';
import { send } from '@/routes/verification';
import { type BreadcrumbItem } from '@/types';

type Props = {
    mustVerifyEmail: boolean;
    status?: string;
};

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

const page = usePage();
const user = page.props.auth.user;
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Profile settings" />

        <h1 class="sr-only">Profile Settings</h1>

        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your name and email address"
                />

                <Form
                    v-bind="ProfileController.update.form()"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <UFormField label="Name" name="name" :error="errors.name">
                        <UInput
                            id="name"
                            class="w-full"
                            name="name"
                            :default-value="user.name"
                            required
                            autocomplete="name"
                            placeholder="Full name"
                        />
                    </UFormField>

                    <UFormField
                        label="Email address"
                        name="email"
                        :error="errors.email"
                    >
                        <UInput
                            id="email"
                            type="email"
                            class="w-full"
                            name="email"
                            :default-value="user.email"
                            required
                            autocomplete="username"
                            placeholder="Email address"
                        />
                    </UFormField>

                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="text-sm text-muted">
                            Your email address is unverified.
                            <Link
                                :href="send()"
                                as="button"
                                class="text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-primary"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        <UAlert
                            v-if="status === 'verification-link-sent'"
                            color="success"
                            variant="subtle"
                            description="A new verification link has been sent to your email address."
                            class="mt-2"
                        />
                    </div>

                    <div class="flex items-center gap-4">
                        <UButton
                            type="submit"
                            :loading="processing"
                            label="Save"
                            data-test="update-profile-button"
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

            <DeleteUser />
        </SettingsLayout>
    </AppLayout>
</template>
