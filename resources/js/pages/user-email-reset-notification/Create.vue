<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <AuthLayout
        title="Forgot password"
        description="Enter your email to receive a password reset link"
    >
        <Head title="Forgot password" />

        <UAlert
            v-if="status"
            color="success"
            variant="subtle"
            :description="status"
            class="mb-4"
        />

        <div class="space-y-6">
            <Form
                v-bind="email.form()"
                v-slot="{ errors, processing }"
                class="space-y-4"
            >
                <UFormField
                    label="Email address"
                    name="email"
                    :error="errors.email"
                >
                    <UInput
                        id="email"
                        type="email"
                        name="email"
                        autocomplete="off"
                        autofocus
                        placeholder="email@example.com"
                        class="w-full"
                    />
                </UFormField>

                <div class="flex items-center justify-start">
                    <UButton
                        type="submit"
                        block
                        :loading="processing"
                        label="Email password reset link"
                        data-test="email-password-reset-link-button"
                    />
                </div>
            </Form>

            <p class="text-center text-sm text-muted">
                <span>Or, return to</span>
                <TextLink :href="login()">log in</TextLink>
            </p>
        </div>
    </AuthLayout>
</template>
