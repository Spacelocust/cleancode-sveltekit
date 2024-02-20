<script lang="ts">
    import { enhance } from "$app/forms";
    import * as Card from "$components/ui/card";
    import { Badge } from "$components/ui/badge";
    import * as Dialog from "$components/ui/dialog";
    import { Button } from "$components/ui/button";
    import { Input } from "$components/ui/input";
    import { Label } from "$components/ui/label";
    import { toast } from "svelte-sonner";

    import type { PageData } from "./$types";

    export let data: PageData;

    let dialogOpen = false;
</script>

<div class="flex flex-col items-center justify-center gap-3">
    <h1>Your cards</h1>

    <Button
        type="button"
        on:click={() => {
            dialogOpen = true;
        }}>Add a new card</Button
    >

    <Dialog.Root bind:open={dialogOpen}>
        <Dialog.Trigger />
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Add a new card</Dialog.Title>
                <Dialog.Description>
                    Adding a new for the Leitner system.
                </Dialog.Description>
            </Dialog.Header>
            <form
                id="add-card-form"
                method="post"
                action="?/addCard"
                use:enhance={() => {
                    return async ({ update, result }) => {
                        await update();

                        if (result.type === "success") {
                            dialogOpen = false;

                            toast.success("Card added successfully.");
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
                        <Label for="question">Question</Label>
                        <Input name="question" id="question" required />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="answer">Answer</Label>
                        <Input name="answer" id="answer" required />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="tag">Tag</Label>
                        <Input name="tag" id="tag" />
                    </div>
                </div>
            </form>
            <Dialog.Footer>
                <Button type="submit" form="add-card-form">Create</Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>

    {#if data.cards.length === 0}
        <p role="status">No cards yet.</p>
        <button
            type="button"
            class="font-bold"
            on:click={() => {
                dialogOpen = true;
            }}>Try adding a new one !</button
        >
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
                        <p>{card.answer}</p>
                        {#if card.tag}
                            <div class="flex justify-end">
                                <Badge variant="outline">{card.tag}</Badge>
                            </div>
                        {/if}
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    {/if}
</div>
