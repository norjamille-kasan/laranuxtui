# Laravel Starter Kit (Inertia, Vue & Nuxt UI)

An opinionated, type-safe [Laravel](https://laravel.com) starter kit based on
**[Nuno Maduro's Laravel Starter Kit (Inertia & Vue)](https://github.com/nunomaduro/laravel-starter-kit-inertia-vue)**,
rebuilt with **[Nuxt UI](https://ui.nuxt.com)**.

<p>
    <a href="https://github.com/norjamille-kasan/laranuxtui/actions"><img src="https://github.com/norjamille-kasan/laranuxtui/actions/workflows/tests.yml/badge.svg" alt="Build Status"></a>
    <a href="https://packagist.org/packages/norjamille-kasan/laravel-starter-kit-nuxt-ui"><img src="https://img.shields.io/packagist/dt/norjamille-kasan/laravel-starter-kit-nuxt-ui" alt="Total Downloads"></a>
    <a href="https://packagist.org/packages/norjamille-kasan/laravel-starter-kit-nuxt-ui"><img src="https://img.shields.io/packagist/v/norjamille-kasan/laravel-starter-kit-nuxt-ui" alt="Latest Stable Version"></a>
    <a href="https://packagist.org/packages/norjamille-kasan/laravel-starter-kit-nuxt-ui"><img src="https://img.shields.io/packagist/l/norjamille-kasan/laravel-starter-kit-nuxt-ui" alt="License"></a>
</p>

**Laravel Starter Kit (Inertia, Vue & Nuxt UI)** keeps the ultra-strict, type-safe foundation of Nuno Maduro's starter kit and swaps its shadcn-vue UI layer for [Nuxt UI](https://ui.nuxt.com) v4. Every page, layout and shared component is built from Nuxt UI components on Tailwind CSS v4, on top of the same Actions-oriented architecture, 100% type coverage and fail-fast tooling.

## Nuxt UI Edition

- **Nuxt UI v4 components**: accessible, themeable components built on Reka UI and Tailwind CSS v4 — `UApp`, `UButton`, `UFormField`, `UInput`, `UModal`, `UPinInput`, `UCard`, `UAlert`, `UDropdownMenu`, and more.
- **Nuxt UI sidebar shell**: `USidebar` with icon collapse, cookie-persisted state and a mobile slideover.
- **Persistent layouts**: pages declare their layout with `defineOptions({ layout })` and pass breadcrumbs through `setLayoutProps`.
- **Flash toasts**: `Inertia::flash('toast', [...])` renders Nuxt UI toasts through `resources/js/lib/flashToast.ts`.
- **Appearance**: Nuxt UI's color mode is disabled in favour of the starter kit's cookie-based light/dark/system setting.
- **AI tooling**: the Nuxt UI MCP server and skill are included (`.agents/skills/nuxt-ui`, `opencode.json`).

## Why This Starter Kit?

Modern PHP has evolved into a mature, type-safe language, yet many Laravel projects still operate with loose conventions and optional typing. This starter kit changes that paradigm by enforcing:

- **Fully Actions-Oriented Architecture**: Every operation is encapsulated in a single-action class
- **Cruddy by Design**: Standardized CRUD operations for all controllers, actions, and Inertia & Vue pages
- **100% Type Coverage**: Every method, property, and parameter is explicitly typed
- **Zero Tolerance for Code Smells**: Rector, PHPStan, ESLint, and Prettier at maximum strictness catch issues before they become bugs
- **Immutable-First Architecture**: Data structures favor immutability to prevent unexpected mutations
- **Fail-Fast Philosophy**: Errors are caught at compile-time, not runtime
- **Automated Code Quality**: Pre-configured tools ensure consistent, pristine code across your entire team
- **Bun-Powered**: Leveraging Bun for blazing-fast dependency management...
- **Just Better Laravel Defaults**: Thanks to **[Essentials](https://github.com/nunomaduro/essentials)** / strict models, auto eager loading, immutable dates, and more...
- **AI Guidelines**: Integrated AI Guidelines to assist in maintaining code quality and consistency
- **Full Testing Suite**: More than 150 tests with 100% code coverage using Pest

This isn't just another Laravel boilerplate—it's a statement that PHP applications can and should be built with the same rigor as strongly-typed languages like Rust or TypeScript.

## Getting Started

> **Requires [PHP 8.4+](https://php.net/releases/), [Bun](https://bun.sh) and a code coverage driver like [xdebug](https://xdebug.org/docs/install)**.

Create your type-safe Laravel application using [Composer](https://getcomposer.org):

```bash
composer create-project norjamille-kasan/laravel-starter-kit-nuxt-ui --prefer-dist example-app
```

### Initial Setup

Navigate to your project and complete the setup:

```bash
cd example-app

# Setup the project
composer setup

# Start the development server
composer dev
```

### Optional: Browser Testing Setup

If you plan to use Pest's browser testing capabilities:

```bash
bun add playwright
bunx playwright install
```

### Verify Installation

Run the test suite to ensure everything is configured correctly:

```bash
composer test
```

You should see 100% test coverage and all quality checks passing.

## Available Tooling

### Development
- `composer dev` - Starts Laravel server, queue worker, log monitoring, and Vite dev server concurrently

### Code Quality
- `composer lint` - Runs Rector (refactoring), Pint (PHP formatting), and Prettier (JS/TS formatting)
- `composer test:lint` - Dry-run mode for CI/CD pipelines

### Testing
- `composer test:type-coverage` - Ensures 100% type coverage with Pest
- `composer test:types` - Runs PHPStan at level 9 (maximum strictness)
- `composer test:unit` - Runs Pest tests with 100% code coverage requirement
- `composer test` - Runs the complete test suite (type coverage, unit tests, linting, static analysis)

### Maintenance
- `composer update:requirements` - Updates all PHP and NPM dependencies to latest versions

## License

**Laravel Starter Kit (Inertia, Vue & Nuxt UI)** is released under the
**[MIT license](https://opensource.org/licenses/MIT)**.

It is based on **[Laravel Starter Kit (Inertia & Vue)](https://github.com/nunomaduro/laravel-starter-kit-inertia-vue)**
by **[Nuno Maduro](https://x.com/enunomaduro)**, also released under the MIT license.
