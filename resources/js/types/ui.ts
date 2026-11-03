export type Appearance = 'light' | 'dark' | 'system';
export type ResolvedAppearance = 'light' | 'dark';

export type AppShellVariant = 'header' | 'sidebar';

export type FlashToastType = 'success' | 'error' | 'warning' | 'info';

export type FlashToast = {
    type: FlashToastType;
    message: string;
};
