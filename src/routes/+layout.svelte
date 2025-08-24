<script lang="ts">
    import { Navigation } from "@skeletonlabs/skeleton-svelte";
    import { AppBar } from "@skeletonlabs/skeleton-svelte";

    import { fab, FAB_TYPES } from "$lib/shared/fab.svelte";

    import { goBack } from "$lib/utils/goBack";

    import Calendar from "@lucide/svelte/icons/calendar";
    import Files from "@lucide/svelte/icons/files";
    import Settings from "@lucide/svelte/icons/settings";
    import ArrowLeft from "@lucide/svelte/icons/arrow-left";
    import { appbarState } from "$lib/shared/appbar-state.svelte";
    import i18n, { setLang } from "$lib/shared/i18n.svelte";

    import "../app.css";

    setLang(navigator.language);

    let { children } = $props();
    let value = $state("calendar");
</script>

<!-- <svelte:head>
    <meta name="theme-color" content={"bg-primary"} />
</svelte:head> -->

<!-- <div class="card border-surface-100-900 grid grid-rows-[1fr_auto] border-[1px] h-full"> -->
<div class="border-surface-100-900 h-svh flex flex-col relative">
    {#if fab.type != FAB_TYPES.NONE}
        <fab.component {...fab.props} />
    {/if}
    <AppBar>
        {#snippet lead()}
            <button type="button" class="btn-icon" onclick={goBack}>
                <ArrowLeft size={24} />
            </button>
        {/snippet}
        {#snippet trail()}
            <button type="button" class="btn-icon" onclick={appbarState.onclick}>
                <appbarState.icon />
            </button>
        {/snippet}
        <div class="flex items-center justify-center h-full">
            <span class="my-auto">{appbarState.title}</span>
        </div>
    </AppBar>
    <!-- Content -->
    <div class="flex-1 overflow-y-scroll p-4 min-h-0 h-0">
        {@render children()}
    </div>
    <!-- Component -->
    <Navigation.Bar {value} onValueChange={(newValue) => (value = newValue)}>
        <Navigation.Tile
            id="calendar"
            label={i18n().calendar}
            href="/calendar"
            active="text-primary-500"><Calendar /></Navigation.Tile
        >
        <Navigation.Tile
            id="templates"
            label={i18n().templates}
            href="/templates"
            active="text-primary-500"><Files /></Navigation.Tile
        >
        <Navigation.Tile
            id="settings"
            label={i18n().settings}
            href="/settings"
            active="text-primary-500"><Settings /></Navigation.Tile
        >
    </Navigation.Bar>
</div>
