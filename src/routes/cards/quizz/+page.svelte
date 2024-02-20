<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import type { ActionData } from "../[cardId]/$types";
  import * as Card from "$components/ui/card";
  import { Button } from "$components/ui/button";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";
  import { Toaster } from "$components/ui/sonner";
  import { toast } from "svelte-sonner";

  export let data: PageData;

  let questionsAnswer: {
    [key: string]: boolean;
  } = {};
</script>

<div class="flex flex-wrap gap-2">
  {#each data.cards as card}
    <Card.Root>
      <Card.Header>
        <Card.Title>{card.question}</Card.Title>
        <Card.Description>Category: {card.category}</Card.Description>
      </Card.Header>
      <Card.Content>
        {#if questionsAnswer[card.id]}
          <p>Answer: {card.answer}</p>
        {/if}
        <form
          method="post"
          action={`/cards/${card.id}/?/answer`}
          use:enhance={({ cancel }) => {
            if (questionsAnswer[card.id]) {
              cancel();
              return;
            }

            questionsAnswer[card.id] = true;
            return async ({ update, result }) => {
              if (result.type === "failure") {
                if (result.data && "error" in result.data) {
                  toast.error(result.data.error);
                }
              }
              await update();
              let { [card.id]: _, ...rest } = questionsAnswer;
              questionsAnswer = rest;
            };
          }}
        >
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="answer">Answer</Label>
              <Input
                type="text"
                name="answer"
                id="answer"
                placeholder="answer"
                class="max-w-xs"
              />
              <Input
                type="hidden"
                name="supposedAnswer"
                id="supposedAnswer"
                value={card.answer}
              />
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card.Content>
    </Card.Root>
  {/each}
  <Toaster />
</div>
