<script lang="ts">
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    // Icons
    import IconCalendar from "@lucide/svelte/icons/calendar";
    import IconFiles from "@lucide/svelte/icons/files";
    import IconSettings from "@lucide/svelte/icons/settings";
    // import IconPaperclip from "@lucide/svelte/icons/paperclip";
    // import IconCircleUser from "@lucide/svelte/icons/circle-user";

    import "../app.css";

    let { children } = $props();
    let value = $state("Settings");
</script>

<!-- <div class="card border-surface-100-900 grid grid-rows-[1fr_auto] border-[1px] h-full"> -->
<div class="border-surface-100-900 h-full flex flex-col">
    <AppBar>
        {#snippet lead()}
            <h2 class="h2">{value}</h2>
            <!-- <ArrowLeft size={24} /> -->
        {/snippet}
        <!-- {#snippet trail()}
            <IconPaperclip size={20} />
            <IconCalendar size={20} />
            <IconCircleUser size={20} />
        {/snippet}
        <span>Title</span> -->
    </AppBar>
    <!-- Content -->
    <div class="flex-1">
        {@render children()}
    </div>
    <!-- Component -->
    <Navigation.Bar {value} onValueChange={(newValue) => (value = newValue)}>
        <Navigation.Tile id="Calendar" label="Calendar" href="/calendar"
            ><IconCalendar /></Navigation.Tile
        >
        <Navigation.Tile id="Templates" label="Templates" href="/templates"
            ><IconFiles /></Navigation.Tile
        >
        <Navigation.Tile id="Settings" label="Settings" href="/settings"
            ><IconSettings /></Navigation.Tile
        >
    </Navigation.Bar>
</div>
