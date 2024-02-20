<script lang="ts">
  import "../app.pcss";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import { Badge } from "$components/ui/badge";
  import { Button } from "$components/ui/button";
  import { Separator } from "$components/ui/separator";
  import * as DropdownMenu from "$components/ui/dropdown-menu";

  export let data: PageData;
</script>

<header class="px-4 lg:px-6 py-2.5" style="view-transition-name: header;">
  <div
    class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
  >
    <a href="/">Leitner</a>
    <nav class="flex items-center lg:order-2 sm:mx-0 mx-auto">
      <ul class="contents">
        {#if data.user}
          <li class="flex items-center gap-2">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Badge variant="outline">Account</Badge>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.Label>{data.user.username}</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <a href="/cards">Cards</a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <a href="/cards/quizz">Quizz</a>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <form method="post" action="/?/logout" use:enhance>
                      <button type="submit">Sign out</button>
                    </form>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
          <li></li>
        {:else}
          <li><Button href="/login">Sign in</Button></li>
        {/if}
      </ul>
    </nav>
  </div>
</header>

<main class="flex justify-center max-w-xl mx-auto w-full my-6">
  <slot />
</main>
