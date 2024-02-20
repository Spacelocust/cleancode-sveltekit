<script lang="ts">
  import { Label as LabelPrimitive } from "bits-ui";
  import clsx from "clsx";

  type $$Props = LabelPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<LabelPrimitive.Root
  class={clsx(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...$$restProps}
>
  <slot />
</LabelPrimitive.Root>
