<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import AuthBase from '@/layouts/AuthLayout.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();
</script>

<template>
    <AuthBase
        title="Log in to your account"
        description="Enter your email and password below to log in"
    >
        <Head title="Log in" />

        <UAlert
            v-if="status"
            color="success"
            variant="subtle"
            :description="status"
            class="mb-4"
        />

        <Form
            v-bind="store.form()"
            :reset-on-success="['password']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
        >
            <div class="grid gap-4">
                <UFormField
                    label="Email address"
                    name="email"
                    :error="errors.email"
                >
                    <UInput
                        id="email"
                        type="email"
                        name="email"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="email"
                        placeholder="email@example.com"
                        class="w-full"
                    />
                </UFormField>

                <UFormField name="password" :error="errors.password">
                    <template #label>
                        <div
                            class="flex w-full items-center justify-between gap-2"
                        >
                            <span>Password</span>
                            <TextLink
                                v-if="canResetPassword"
                                :href="request()"
                                class="text-sm"
                                :tabindex="5"
                            >
                                Forgot password?
                            </TextLink>
                        </div>
                    </template>
                    <UInput
                        id="password"
                        type="password"
                        name="password"
                        required
                        :tabindex="2"
                        autocomplete="current-password"
                        placeholder="Password"
                        class="w-full"
                    />
                </UFormField>

                <UCheckbox name="remember" label="Remember me" :tabindex="3" />

                <UButton
                    type="submit"
                    block
                    class="mt-2"
                    :tabindex="4"
                    :loading="processing"
                    label="Log in"
                    data-test="login-button"
                />
            </div>

            <p v-if="canRegister" class="text-center text-sm text-muted">
                Don't have an account?
                <TextLink :href="register()" :tabindex="5">Sign up</TextLink>
            </p>
        </Form>
    </AuthBase>
</template>
