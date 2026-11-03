<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { dashboard, login, register } from '@/routes';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const ecosystemLinks = [
    {
        title: 'Read the documentation',
        description:
            'Laravel has an incredibly rich ecosystem. Start with the official documentation to learn the framework from the ground up.',
        icon: 'i-lucide-book-open',
        to: 'https://laravel.com/docs',
        target: '_blank',
    },
    {
        title: 'Watch video tutorials',
        description:
            'Laracasts offers thousands of video tutorials covering Laravel, PHP, and modern web development.',
        icon: 'i-lucide-play-circle',
        to: 'https://laracasts.com',
        target: '_blank',
    },
    {
        title: 'Deploy your application',
        description:
            'Laravel Cloud is the fastest way to deploy and scale your Laravel applications.',
        icon: 'i-lucide-rocket',
        to: 'https://cloud.laravel.com',
        target: '_blank',
    },
    {
        title: 'Style with Nuxt UI',
        description:
            'Nuxt UI provides accessible, themeable Vue components built on Tailwind CSS and Reka UI.',
        icon: 'i-lucide-palette',
        to: 'https://ui.nuxt.com',
        target: '_blank',
    },
];
</script>

<template>
    <Head title="Welcome" />

    <div class="flex min-h-svh flex-col bg-default">
        <UHeader :toggle="false" :ui="{ root: 'border-b border-default' }">
            <template #title>
                <div class="flex items-center gap-2">
                    <AppLogoIcon class="size-7 fill-current text-highlighted" />
                    <span class="font-semibold text-highlighted">Laravel</span>
                </div>
            </template>

            <template #right>
                <UButton
                    v-if="$page.props.auth.user"
                    :to="dashboard().url"
                    color="neutral"
                    variant="outline"
                    label="Dashboard"
                />
                <template v-else>
                    <UButton
                        :to="login().url"
                        color="neutral"
                        variant="ghost"
                        label="Log in"
                    />
                    <UButton
                        v-if="canRegister"
                        :to="register().url"
                        label="Register"
                    />
                </template>
            </template>
        </UHeader>

        <UMain>
            <UContainer>
                <UPageHero
                    headline="Laravel"
                    title="Let's get started"
                    description="Laravel has an incredibly rich ecosystem. We suggest starting with the following."
                    :links="[
                        {
                            label: 'Documentation',
                            to: 'https://laravel.com/docs',
                            target: '_blank',
                            trailingIcon: 'i-lucide-arrow-right',
                        },
                        {
                            label: 'Laracasts',
                            to: 'https://laracasts.com',
                            target: '_blank',
                            color: 'neutral',
                            variant: 'subtle',
                        },
                        {
                            label: 'Deploy now',
                            to: 'https://cloud.laravel.com',
                            target: '_blank',
                            color: 'neutral',
                            variant: 'ghost',
                        },
                    ]"
                />

                <UPageGrid class="pb-24 lg:grid-cols-4">
                    <UPageCard
                        v-for="link in ecosystemLinks"
                        :key="link.title"
                        v-bind="link"
                    />
                </UPageGrid>
            </UContainer>
        </UMain>

        <USeparator />

        <UContainer
            class="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row"
        >
            <p>Built with Laravel, Inertia, Vue and Nuxt UI.</p>
            <div class="flex items-center gap-4">
                <ULink
                    to="https://laravel.com/docs"
                    target="_blank"
                    class="hover:text-default"
                >
                    Documentation
                </ULink>
                <ULink
                    to="https://ui.nuxt.com"
                    target="_blank"
                    class="hover:text-default"
                >
                    Nuxt UI
                </ULink>
                <ULink
                    to="https://github.com/laravel/vue-starter-kit"
                    target="_blank"
                    class="hover:text-default"
                >
                    GitHub
                </ULink>
            </div>
        </UContainer>
    </div>
</template>
