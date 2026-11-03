<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { ref, useTemplateRef } from 'vue';
import UserController from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/Heading.vue';

const isOpen = ref(false);
const passwordInput = useTemplateRef('passwordInput');

const focusPassword = (): void => {
    const root = passwordInput.value?.$el as HTMLElement | undefined;

    root?.querySelector('input')?.focus();
};

const closeModal = (reset: () => void, clearErrors: () => void): void => {
    isOpen.value = false;
    clearErrors();
    reset();
};
</script>

<template>
    <div class="space-y-6">
        <Heading
            variant="small"
            title="Delete account"
            description="Delete your account and all of its resources"
        />
        <div
            class="space-y-4 rounded-lg border border-error/20 bg-error/10 p-4"
        >
            <div class="space-y-0.5 text-error">
                <p class="font-medium">Warning</p>
                <p class="text-sm">
                    Please proceed with caution, this cannot be undone.
                </p>
            </div>
            <UModal
                v-model:open="isOpen"
                title="Are you sure you want to delete your account?"
                description="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
                :ui="{ content: 'sm:max-w-lg' }"
            >
                <UButton
                    color="error"
                    label="Delete account"
                    data-test="delete-user-button"
                />

                <template #body>
                    <Form
                        v-bind="UserController.destroy.form()"
                        reset-on-success
                        :options="{ preserveScroll: true }"
                        class="space-y-4"
                        v-slot="{ errors, processing, reset, clearErrors }"
                        @error="focusPassword"
                    >
                        <UFormField
                            label="Password"
                            name="password"
                            :error="errors.password"
                        >
                            <UInput
                                id="password"
                                ref="passwordInput"
                                type="password"
                                name="password"
                                placeholder="Password"
                                class="w-full"
                            />
                        </UFormField>

                        <div class="flex justify-end gap-2">
                            <UButton
                                color="neutral"
                                variant="ghost"
                                label="Cancel"
                                :disabled="processing"
                                @click="closeModal(reset, clearErrors)"
                            />
                            <UButton
                                type="submit"
                                color="error"
                                label="Delete account"
                                :loading="processing"
                                data-test="confirm-delete-user-button"
                            />
                        </div>
                    </Form>
                </template>
            </UModal>
        </div>
    </div>
</template>
