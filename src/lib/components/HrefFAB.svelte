<script lang="ts">
    import { type IconProps } from "@lucide/svelte";
    interface Props {
        icon: IconProps;
        href: string;
    }
    let { icon, href }: Props = $props();
</script>

<a
    type="button"
    class="absolute btn preset-filled-primary-500 bottom-25 right-5 z-10 rounded-full h-15 w-15 shadow-md"
    {href}
>
    <svelte:component this={icon} />
</a>
