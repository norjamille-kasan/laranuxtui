<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { update } from '@/routes/password';

const props = defineProps<{
    token: string;
    email: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <AuthLayout
        title="Reset password"
        description="Please enter your new password below"
    >
        <Head title="Reset password" />

        <Form
            v-bind="update.form()"
            :transform="(data) => ({ ...data, token, email })"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
        >
            <div class="grid gap-4">
                <UFormField label="Email" name="email" :error="errors.email">
                    <UInput
                        id="email"
                        type="email"
                        name="email"
                        autocomplete="email"
                        v-model="inputEmail"
                        class="w-full"
                        readonly
                    />
                </UFormField>

                <UFormField
                    label="Password"
                    name="password"
                    :error="errors.password"
                >
                    <UInput
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="new-password"
                        class="w-full"
                        autofocus
                        placeholder="Password"
                    />
                </UFormField>

                <UFormField
                    label="Confirm Password"
                    name="password_confirmation"
                    :error="errors.password_confirmation"
                >
                    <UInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        autocomplete="new-password"
                        class="w-full"
                        placeholder="Confirm password"
                    />
                </UFormField>

                <UButton
                    type="submit"
                    block
                    class="mt-2"
                    :loading="processing"
                    label="Reset password"
                    data-test="reset-password-button"
                />
            </div>
        </Form>
    </AuthLayout>
</template>
