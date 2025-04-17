<script lang="ts">
    import Plus from "@lucide/svelte/icons/plus";
    import StoreListing from "$lib/components/StoreListing.svelte";
    import { db } from "$lib/services/db";
    import { liveQuery } from "dexie";

    let templates = liveQuery(() => db.templates.toArray());
</script>

<div class="flex flex-col items-center">
    {#if templates}
        <div class="w-full mb-4">
            <StoreListing items={templates} />
        </div>
    {/if}
    <a
        type="button"
        class="w-6 h-6 btn-icon preset-filled-primary-500 rounded-full"
        href="templates/new"
    >
        <Plus /></a
    >
</div>
