<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import * as Card from "$components/ui/card";
  import { Input } from "$components/ui/input";
  import { Button } from "$components/ui/button";
  import { Label } from "$components/ui/label";

  export let form: ActionData;
</script>

<Card.Root class="w-[350px]">
  <Card.Header>
    <Card.Title>Sign In</Card.Title>
    <Card.Description>Use your account to access the website</Card.Description>
  </Card.Header>
  <Card.Content>
    <form id="login-form" method="post" use:enhance>
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="username">Username</Label>
          <Input
            name="username"
            id="username"
            placeholder="username"
            class="max-w-xs"
          />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            class="max-w-xs"
          />

          {#if form?.error}
            <p class="text-sm font-light text-red-600">{form.error}</p>
          {/if}
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex justify-between">
    <Button href="/" variant="outline">Cancel</Button>
    <Button type="submit" form="login-form">Sign In</Button>
  </Card.Footer>
</Card.Root>
