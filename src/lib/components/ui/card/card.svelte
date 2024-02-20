<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import clsx from "clsx";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class={clsx(
    "rounded-xl border bg-card text-card-foreground shadow",
    className
  )}
  {...$$restProps}
  on:click
  on:focusin
  on:focusout
  on:mouseenter
  on:mouseleave
>
  <slot />
</div>
