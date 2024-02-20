<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$components/ui/button/button.svelte";
</script>

<svelte:head>
    <title>{$page.status}</title>
    <meta
        name="description"
        content={$page.error?.message ?? "Une erreur est survenue."}
    />
    <meta name="robots" content="noindex" />
    <meta name="googlebot" content="noindex" />
</svelte:head>

<div class="space-y-3 text-center">
    <h1
        class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600"
    >
        {$page.status}
    </h1>
    <p class="mb-4 text-lg font-light text-gray-500">
        {$page.error?.message ?? "Une erreur est survenue."}
    </p>
    <Button href="/">Go home</Button>
</div>
