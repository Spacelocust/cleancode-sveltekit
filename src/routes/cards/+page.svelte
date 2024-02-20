<script lang="ts">
  import { enhance } from "$app/forms";
  import * as Card from "$components/ui/card";
  import { Badge } from "$components/ui/badge";
  import type { ActionData, PageData } from "./$types";
  import * as Dialog from "$components/ui/dialog";
  import { Button, buttonVariants } from "$components/ui/button";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";

  export let data: PageData;
</script>

<div class="grid w-full items-center gap-4">
  <h1>Your cards</h1>
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({})}>Add new card</Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add a new card</Dialog.Title>
        <Dialog.Description>
          Adding a new for the leitner system
        </Dialog.Description>
      </Dialog.Header>
      <form id="add-card-form" method="post" action="?/addCard" use:enhance>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="question">Question</Label>
            <Input
              name="question"
              id="question"
              placeholder="question"
              class="max-w-xs"
            />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Answer</Label>
            <Input
              name="answer"
              id="answer"
              placeholder="answer"
              class="max-w-xs"
            />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="tag">Tag</Label>
            <Input name="tag" id="tag" placeholder="tag" class="max-w-xs" />
            <!-- {#if form?.error}
              <p class="text-sm font-light text-red-600">{form.error}</p>
            {/if} -->
          </div>
        </div>
      </form>
      <Dialog.Footer>
        <Button type="submit" form="add-card-form">Create</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
  {#if data.cards.length === 0}
    <p>no cards..</p>
  {:else}
    {#each data.cards as card}
      <Card.Root>
        <Card.Header>
          <Card.Title>{card.question}</Card.Title>
          <Card.Description>Category: {card.category}</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>{card.answer}</p>
          <div class="flex flex-wrap">
            {#if card.tag}
              {#each card.tag.split(",") as tag}
                <Badge variant="outline">{tag}</Badge>
              {/each}
            {/if}
          </div>
        </Card.Content>
      </Card.Root>
    {/each}
  {/if}
</div>
