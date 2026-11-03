<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
</script>

<template>
    <AuthBase
        title="Create an account"
        description="Enter your details below to create your account"
    >
        <Head title="Register" />

        <Form
            v-bind="store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-4">
                <UFormField label="Name" name="name" :error="errors.name">
                    <UInput
                        id="name"
                        type="text"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="name"
                        name="name"
                        placeholder="Full name"
                        class="w-full"
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
                        required
                        :tabindex="2"
                        autocomplete="email"
                        name="email"
                        placeholder="email@example.com"
                        class="w-full"
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
                        required
                        :tabindex="3"
                        autocomplete="new-password"
                        name="password"
                        placeholder="Password"
                        class="w-full"
                    />
                </UFormField>

                <UFormField
                    label="Confirm password"
                    name="password_confirmation"
                    :error="errors.password_confirmation"
                >
                    <UInput
                        id="password_confirmation"
                        type="password"
                        required
                        :tabindex="4"
                        autocomplete="new-password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        class="w-full"
                    />
                </UFormField>

                <UButton
                    type="submit"
                    block
                    class="mt-2"
                    :tabindex="5"
                    :loading="processing"
                    label="Create account"
                    data-test="register-user-button"
                />
            </div>

            <p class="text-center text-sm text-muted">
                Already have an account?
                <TextLink :href="login()" :tabindex="6">Log in</TextLink>
            </p>
        </Form>
    </AuthBase>
</template>
