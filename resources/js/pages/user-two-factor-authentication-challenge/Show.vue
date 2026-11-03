<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { store } from '@/routes/two-factor/login';
import type { TwoFactorConfigContent } from '@/types';

const authConfigContent = computed<TwoFactorConfigContent>(() => {
    if (showRecoveryInput.value) {
        return {
            title: 'Recovery Code',
            description:
                'Please confirm access to your account by entering one of your emergency recovery codes.',
            buttonText: 'login using an authentication code',
        };
    }

    return {
        title: 'Authentication Code',
        description:
            'Enter the authentication code provided by your authenticator application.',
        buttonText: 'login using a recovery code',
    };
});

const showRecoveryInput = ref<boolean>(false);

const toggleRecoveryMode = (clearErrors: () => void): void => {
    showRecoveryInput.value = !showRecoveryInput.value;
    clearErrors();
    code.value = [];
};

const code = ref<string[]>([]);
const codeValue = computed(() => code.value.join(''));
</script>

<template>
    <AuthLayout
        :title="authConfigContent.title"
        :description="authConfigContent.description"
    >
        <Head title="Two-Factor Authentication" />

        <div class="space-y-6">
            <template v-if="!showRecoveryInput">
                <Form
                    v-bind="store.form()"
                    class="space-y-4"
                    reset-on-error
                    @error="code = []"
                    #default="{ errors, processing, clearErrors }"
                >
                    <input type="hidden" name="code" :value="codeValue" />
                    <div
                        class="flex flex-col items-center justify-center space-y-3 text-center"
                    >
                        <UPinInput
                            id="otp"
                            v-model="code"
                            :length="6"
                            otp
                            :disabled="processing"
                            autofocus
                        />
                        <p v-if="errors.code" class="text-sm text-error">
                            {{ errors.code }}
                        </p>
                    </div>
                    <UButton
                        type="submit"
                        block
                        :loading="processing"
                        label="Continue"
                    />
                    <p class="text-center text-sm text-muted">
                        <span>or you can </span>
                        <button
                            type="button"
                            class="text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-primary"
                            @click="() => toggleRecoveryMode(clearErrors)"
                        >
                            {{ authConfigContent.buttonText }}
                        </button>
                    </p>
                </Form>
            </template>

            <template v-else>
                <Form
                    v-bind="store.form()"
                    class="space-y-4"
                    reset-on-error
                    #default="{ errors, processing, clearErrors }"
                >
                    <UFormField
                        name="recovery_code"
                        :error="errors.recovery_code"
                    >
                        <UInput
                            name="recovery_code"
                            type="text"
                            placeholder="Enter recovery code"
                            :autofocus="showRecoveryInput"
                            required
                            class="w-full"
                        />
                    </UFormField>
                    <UButton
                        type="submit"
                        block
                        :loading="processing"
                        label="Continue"
                    />

                    <p class="text-center text-sm text-muted">
                        <span>or you can </span>
                        <button
                            type="button"
                            class="text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-primary"
                            @click="() => toggleRecoveryMode(clearErrors)"
                        >
                            {{ authConfigContent.buttonText }}
                        </button>
                    </p>
                </Form>
            </template>
        </div>
    </AuthLayout>
</template>
