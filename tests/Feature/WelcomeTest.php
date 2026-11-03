<?php

declare(strict_types=1);

it('renders the welcome page', function (): void {
    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Welcome')
            ->where('canRegister', true));
});
