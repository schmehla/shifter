<script lang="ts">
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { AppBar } from "@skeletonlabs/skeleton-svelte";

    import { fab } from "$lib/shared/fab.svelte";

    import { goBack } from "$lib/utils/goBack";

    import Calendar from "@lucide/svelte/icons/calendar";
    import Files from "@lucide/svelte/icons/files";
    import Settings from "@lucide/svelte/icons/settings";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";

    import "../app.css";

    let { children } = $props();
    let value = $state("Calendar");
</script>

<!-- <svelte:head>
    <meta name="theme-color" content={"bg-primary"} />
</svelte:head> -->

<!-- <div class="card border-surface-100-900 grid grid-rows-[1fr_auto] border-[1px] h-full"> -->
<div class="border-surface-100-900 h-svh flex flex-col relative">
    <!-- FAB -->
    {#if fab.href === null}
        <button
            type="button"
            class="absolute btn preset-filled-primary-500 bottom-25 right-5 z-10 rounded-full h-15 w-15 shadow-md"
            onclick={fab.onClick}
        >
            <svelte:component this={fab.icon} />
            <!-- <fab.icon /> -->
        </button>
    {:else}
        <a
            type="button"
            class="absolute btn preset-filled-primary-500 bottom-25 right-5 z-10 rounded-full h-15 w-15 shadow-md"
            href={fab.href}
        >
            <svelte:component this={fab.icon} />
            <!-- <fab.icon /> -->
        </a>
    {/if}
    <AppBar>
        {#snippet lead()}
            <button type="button" class="btn-icon" onclick={goBack}>
                <ArrowLeft size={24} />
            </button>
        {/snippet}
        <!-- {#snippet trail()}
        {/snippet} -->
        <span>{value}</span>
    </AppBar>
    <!-- Content -->
    <div class="flex-1 overflow-y-scroll p-4 min-h-0 h-0">
        {@render children()}
    </div>
    <!-- Component -->
    <Navigation.Bar {value} onValueChange={(newValue) => (value = newValue)}>
        <Navigation.Tile id="Calendar" label="Calendar" href="/calendar" active="text-primary-500"
            ><Calendar /></Navigation.Tile
        >
        <Navigation.Tile
            id="Templates"
            label="Templates"
            href="/templates"
            active="text-primary-500"><Files /></Navigation.Tile
        >
        <Navigation.Tile id="Settings" label="Settings" href="/settings" active="text-primary-500"
            ><Settings /></Navigation.Tile
        >
    </Navigation.Bar>
</div>
