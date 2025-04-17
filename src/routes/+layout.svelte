<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { AppBar } from "@skeletonlabs/skeleton-svelte";

    import Calendar from "@lucide/svelte/icons/calendar";
    import Files from "@lucide/svelte/icons/files";
    import Settings from "@lucide/svelte/icons/settings";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";

    import "../app.css";

    function goBack() {
        const path = $page.url.pathname;
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 1) {
            goto(`/${segments[segments.length - 2]}`);
        }
    }

    let { children } = $props();
    let value = $state("Settings");
</script>

<!-- <div class="card border-surface-100-900 grid grid-rows-[1fr_auto] border-[1px] h-full"> -->
<div class="border-surface-100-900 h-svh flex flex-col">
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
    <div class="flex-1 overflow-y-scroll p-4">
        {@render children()}
    </div>
    <!-- Component -->
    <Navigation.Bar {value} onValueChange={(newValue) => (value = newValue)}>
        <Navigation.Tile id="Calendar" label="Calendar" href="/calendar"
            ><Calendar /></Navigation.Tile
        >
        <Navigation.Tile id="Templates" label="Templates" href="/templates"
            ><Files /></Navigation.Tile
        >
        <Navigation.Tile id="Settings" label="Settings" href="/settings"
            ><Settings /></Navigation.Tile
        >
    </Navigation.Bar>
</div>
