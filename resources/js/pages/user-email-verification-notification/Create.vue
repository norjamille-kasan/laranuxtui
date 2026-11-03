<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <AuthLayout
        title="Verify email"
        description="Please verify your email address by clicking on the link we just emailed to you."
    >
        <Head title="Email verification" />

        <UAlert
            v-if="status === 'verification-link-sent'"
            color="success"
            variant="subtle"
            description="A new verification link has been sent to the email address you provided during registration."
            class="mb-4"
        />

        <Form
            v-bind="send.form()"
            class="space-y-6 text-center"
            v-slot="{ processing }"
        >
            <UButton
                type="submit"
                color="neutral"
                variant="subtle"
                :loading="processing"
                label="Resend verification email"
            />

            <TextLink
                :href="logout()"
                as="button"
                method="post"
                class="mx-auto block text-sm"
            >
                Log out
            </TextLink>
        </Form>
    </AuthLayout>
</template>
