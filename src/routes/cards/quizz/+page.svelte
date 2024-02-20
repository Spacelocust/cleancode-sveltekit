<script lang="ts">
    import { enhance } from "$app/forms";
    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";
    import { Input } from "$components/ui/input";
    import { Label } from "$components/ui/label";
    import { toast } from "svelte-sonner";

    import type { PageData } from "./$types";
    import Badge from "$components/ui/badge/badge.svelte";

    export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center gap-3">
    <h1>Today's quizz</h1>

    {#if data.cards.length === 0}
        <p role="status">No quizz available for today !</p>
    {:else}
        <div class="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4">
            {#each data.cards as card}
                <Card.Root class="min-w-64">
                    <Card.Header>
                        <Card.Title>{card.question}</Card.Title>
                        <Card.Description
                            >Category: {card.category}</Card.Description
                        >
                    </Card.Header>
                    <Card.Content>
                        <form
                            method="post"
                            action={`/cards/${card.id}/?/answer`}
                            use:enhance={() => {
                                return async ({ update, result }) => {
                                    await update();

                                    if (result.type === "success") {
                                        if (
                                            typeof result.data?.isValid ===
                                            "boolean"
                                        ) {
                                            if (result.data.isValid) {
                                                toast.success(
                                                    "Answer is correct. Good job!"
                                                );
                                            } else {
                                                toast.error(
                                                    "Answer is incorrect. Try again another time."
                                                );
                                            }
                                        }
                                    } else if (
                                        result.type === "failure" &&
                                        typeof result.data?.error === "string"
                                    ) {
                                        toast.error(result.data.error);
                                    } else {
                                        toast.error(
                                            "Oops! Something went wrong. Please try again later."
                                        );
                                    }
                                };
                            }}
                        >
                            <div class="grid w-full items-center gap-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="answer-{card.id}"
                                        >Your answer</Label
                                    >
                                    <Input
                                        type="text"
                                        name="answer"
                                        id="answer-{card.id}"
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
                        {#if card.tag}
                            <div class="flex justify-end mt-3">
                                <Badge variant="outline">{card.tag}</Badge>
                            </div>
                        {/if}
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    {/if}
</div>
