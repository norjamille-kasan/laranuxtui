<?php

declare(strict_types=1);

it('renders the welcome page', function (): void {
    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertSee('<title data-inertia>', false)
        ->assertSee('<script data-page="app" type="application/json">', false)
        ->assertInertia(fn ($page) => $page
            ->component('Welcome')
            ->where('canRegister', true));
});
