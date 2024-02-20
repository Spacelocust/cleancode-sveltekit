<script lang="ts">
    import "../app.pcss";

    import { enhance } from "$app/forms";
    import { Button } from "$components/ui/button";
    import * as DropdownMenu from "$components/ui/dropdown-menu";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import { Toaster } from "$components/ui/sonner";
    import { Moon, Sun } from "radix-icons-svelte";
    import { onNavigate } from "$app/navigation";

    import type { PageData } from "./$types";

    export let data: PageData;

    onNavigate((navigation) => {
        if (!document.startViewTransition) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();

                await navigation.complete;
            });
        });
    });
</script>

<svelte:head>
    <title>Leitner</title>
    <meta
        name="description"
        content="Leitner system app for learning and memorizing."
    />
</svelte:head>

<ModeWatcher />
<Toaster />

<header class="px-4 lg:px-6 py-2.5" style="view-transition-name: header;">
    <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
    >
        <a href="/">Leitner</a>

        <div class="flex items-center gap-2">
            <Button on:click={toggleMode} variant="outline" size="icon">
                <Sun
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <nav class="flex items-center lg:order-2 sm:mx-0 mx-auto">
                <ul class="contents">
                    {#if data.user}
                        <li class="flex items-center gap-2">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="outline">My account</Button
                                    >
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Group>
                                        <DropdownMenu.Label>
                                            {data.user.username}
                                        </DropdownMenu.Label>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item>
                                            <a href="/cards">Cards</a>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item>
                                            <a href="/cards/quizz">Quizz</a>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Separator />
                                        <DropdownMenu.Item>
                                            <form
                                                method="post"
                                                action="/?/logout"
                                                use:enhance
                                            >
                                                <button type="submit"
                                                    >Sign out</button
                                                >
                                            </form>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Group>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </li>
                    {:else}
                        <li><Button href="/login">Sign in</Button></li>
                    {/if}
                </ul>
            </nav>
        </div>
    </div>
</header>

<main class="flex justify-center max-w-screen-xl mx-auto w-full my-6">
    <slot />
</main>
