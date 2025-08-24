<script lang="ts">
    import { type IconProps } from "@lucide/svelte";
    interface Props {
        icon: IconProps;
        onclick: () => void;
    }
    let { icon, onclick }: Props = $props();
</script>

<button
    type="button"
    class="absolute btn preset-filled-primary-500 bottom-25 right-5 z-10 rounded-full h-15 w-15 shadow-md"
    {onclick}
>
    <svelte:component this={icon} />
</button>
