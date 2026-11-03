import { router } from '@inertiajs/vue3';
import { useToast } from '@nuxt/ui/composables/useToast';
import type { App } from 'vue';
import type { FlashToastType } from '@/types/ui';

type ToastApi = ReturnType<typeof useToast>;

const toastIcons: Record<FlashToastType, string> = {
    success: 'i-lucide-circle-check',
    error: 'i-lucide-circle-x',
    warning: 'i-lucide-triangle-alert',
    info: 'i-lucide-info',
};

let toast: ToastApi | null = null;

export function initializeFlashToast(app: App): void {
    toast = app.runWithContext(() => useToast());

    router.on('flash', (event) => {
        const data = event.detail.flash.toast;

        if (!data) {
            return;
        }

        toast?.add({
            title: data.message,
            color: data.type,
            icon: toastIcons[data.type],
        });
    });
}
