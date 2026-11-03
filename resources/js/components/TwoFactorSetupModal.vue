<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { useClipboard } from '@vueuse/core';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { useAppearance } from '@/composables/useAppearance';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import type { TwoFactorConfigContent } from '@/types';

type Props = {
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
};

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('isOpen');

const { resolvedAppearance } = useAppearance();
const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } =
    useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<string[]>([]);
const pinInputContainerRef = useTemplateRef('pinInputContainerRef');

const codeValue = computed(() => code.value.join(''));

const modalConfig = computed<TwoFactorConfigContent>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-Factor Authentication Enabled',
            description:
                'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify Authentication Code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable Two-Factor Authentication',
        description:
            'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const focusPinInput = (): void => {
    pinInputContainerRef.value?.querySelector('input')?.focus();
};

const handleModalNextStep = () => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(focusPinInput);

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = () => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = [];
};

watch(
    () => isOpen.value,
    async (isOpen) => {
        if (!isOpen) {
            resetModalState();
            return;
        }

        if (!qrCodeSvg.value) {
            await fetchSetupData();
        }
    },
);
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :title="modalConfig.title"
        :description="modalConfig.description"
        :ui="{ content: 'sm:max-w-md' }"
    >
        <template #body>
            <div
                class="relative flex w-auto flex-col items-center justify-center space-y-5"
            >
                <template v-if="!showVerificationStep">
                    <AlertError v-if="errors?.length" :errors="errors" />
                    <template v-else>
                        <div
                            class="relative mx-auto flex max-w-md items-center overflow-hidden"
                        >
                            <div
                                class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-default"
                            >
                                <div
                                    v-if="!qrCodeSvg"
                                    class="absolute inset-0 z-10 flex items-center justify-center bg-default"
                                >
                                    <UIcon
                                        name="i-lucide-loader-circle"
                                        class="size-6 animate-spin"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="relative z-10 overflow-hidden border border-default p-5"
                                >
                                    <div
                                        v-html="qrCodeSvg"
                                        class="flex aspect-square size-full items-center justify-center"
                                        :style="{
                                            filter:
                                                resolvedAppearance === 'dark'
                                                    ? 'invert(1) brightness(1.5)'
                                                    : undefined,
                                        }"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="flex w-full items-center">
                            <UButton
                                class="w-full justify-center"
                                :label="modalConfig.buttonText"
                                @click="handleModalNextStep"
                            />
                        </div>

                        <USeparator label="or, enter the code manually" />

                        <div class="flex w-full items-center justify-center">
                            <UInput
                                v-if="!manualSetupKey"
                                loading
                                readonly
                                class="w-full"
                            />
                            <UInput
                                v-else
                                :model-value="manualSetupKey"
                                readonly
                                class="w-full"
                                :ui="{ base: 'font-mono text-sm' }"
                            >
                                <template #trailing>
                                    <UButton
                                        :icon="
                                            copied
                                                ? 'i-lucide-check'
                                                : 'i-lucide-copy'
                                        "
                                        color="neutral"
                                        variant="link"
                                        size="xs"
                                        :aria-label="
                                            copied ? 'Copied' : 'Copy setup key'
                                        "
                                        @click="copy(manualSetupKey || '')"
                                    />
                                </template>
                            </UInput>
                        </div>
                    </template>
                </template>

                <template v-else>
                    <Form
                        v-bind="confirm.form()"
                        reset-on-error
                        @finish="code = []"
                        @success="isOpen = false"
                        v-slot="{ errors: formErrors, processing }"
                    >
                        <input type="hidden" name="code" :value="codeValue" />
                        <div
                            ref="pinInputContainerRef"
                            class="relative w-full space-y-3"
                        >
                            <div
                                class="flex w-full flex-col items-center justify-center space-y-3 py-2"
                            >
                                <UPinInput
                                    id="otp"
                                    v-model="code"
                                    :length="6"
                                    otp
                                    :disabled="processing"
                                    autofocus
                                />
                                <p
                                    v-if="
                                        formErrors
                                            ?.confirmTwoFactorAuthentication
                                            ?.code
                                    "
                                    class="text-sm text-error"
                                >
                                    {{
                                        formErrors
                                            .confirmTwoFactorAuthentication.code
                                    }}
                                </p>
                            </div>

                            <div class="flex w-full items-center gap-5">
                                <UButton
                                    type="button"
                                    color="neutral"
                                    variant="outline"
                                    label="Back"
                                    class="flex-1 justify-center"
                                    :disabled="processing"
                                    @click="showVerificationStep = false"
                                />
                                <UButton
                                    type="submit"
                                    label="Confirm"
                                    class="flex-1 justify-center"
                                    :loading="processing"
                                    :disabled="
                                        processing || codeValue.length < 6
                                    "
                                />
                            </div>
                        </div>
                    </Form>
                </template>
            </div>
        </template>
    </UModal>
</template>
