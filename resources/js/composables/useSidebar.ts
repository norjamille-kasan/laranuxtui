import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

const isOpen = ref(true);
let initialized = false;

const persist = (value: boolean): void => {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `sidebar_state=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
};

const isMobile = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return !window.matchMedia('(min-width: 64rem)').matches;
};

export function useSidebar() {
    if (!initialized) {
        initialized = true;
        isOpen.value = Boolean(usePage().props.sidebarOpen ?? true);
    }

    const toggle = (): void => {
        isOpen.value = !isOpen.value;
        persist(isOpen.value);
    };

    const closeOnMobile = (): void => {
        if (isMobile()) {
            isOpen.value = false;
        }
    };

    return { isOpen, toggle, closeOnMobile };
}
