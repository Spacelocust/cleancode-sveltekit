<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import clsx from "clsx";
  import type { HeadingLevel } from ".";

  type $$Props = HTMLAttributes<HTMLHeadingElement> & {
    tag?: HeadingLevel;
  };

  let className: $$Props["class"] = undefined;
  export let tag: $$Props["tag"] = "h3";
  export { className as class };
</script>

<svelte:element
  this={tag}
  class={clsx("font-semibold leading-none tracking-tight", className)}
  {...$$restProps}
>
  <slot />
</svelte:element>
