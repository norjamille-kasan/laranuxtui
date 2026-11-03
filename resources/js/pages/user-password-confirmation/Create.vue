<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { store } from '@/routes/password/confirm';
</script>

<template>
    <AuthLayout
        title="Confirm your password"
        description="This is a secure area of the application. Please confirm your password before continuing."
    >
        <Head title="Confirm password" />

        <Form
            v-bind="store.form()"
            reset-on-success
            v-slot="{ errors, processing }"
        >
            <div class="space-y-6">
                <UFormField
                    label="Password"
                    name="password"
                    :error="errors.password"
                >
                    <UInput
                        id="password"
                        type="password"
                        name="password"
                        class="w-full"
                        required
                        autocomplete="current-password"
                        autofocus
                    />
                </UFormField>

                <div class="flex items-center">
                    <UButton
                        type="submit"
                        block
                        :loading="processing"
                        label="Confirm Password"
                        data-test="confirm-password-button"
                    />
                </div>
            </div>
        </Form>
    </AuthLayout>
</template>
