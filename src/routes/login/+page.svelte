<script lang="ts">
  import { enhance } from "$app/forms";
  import { dataset_dev } from "svelte/internal";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{data?.username}
<h1>Sign up</h1>
<form method="post" use:enhance>
  <label for="username">Username</label>
  <input name="username" id="username" /><br />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" /><br />
  {#if form?.error}
    <p class="text-sm font-light text-red-600">{form.error}</p>
  {/if}
  <button>continuer</button>
</form>
