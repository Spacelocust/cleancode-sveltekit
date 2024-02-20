<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.user}
  <p>Logged in as {data.user.username}</p>
  <form method="post" action="/?/logout" use:enhance>
    <button>Sign out</button>
  </form>
{:else}
  <a href="/login">Sign in</a>
{/if}

<h1>Welcome to SvelteKit</h1>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
