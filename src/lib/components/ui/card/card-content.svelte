<script lang="ts">
  import clsx from "clsx";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class={clsx("p-6 pt-0", className)} {...$$restProps}>
  <slot />
</div>
