<script lang="ts">
    import Plus from "@lucide/svelte/icons/plus";
    import StoreListing from "$lib/components/StoreListing.svelte";
    import { db } from "$lib/services/db";
    import { liveQuery } from "dexie";
    import { fab } from "$lib/shared/fab.svelte";

    let templates = liveQuery(() => db.templates.toArray());
    fab.icon = Plus;
    // fab.onClick = () => console.log("aa");
    fab.href = "/templates/new";
</script>

<div class="flex flex-col items-center">
    {#if templates}
        <div class="w-full mb-4">
            <StoreListing items={templates} />
        </div>
    {/if}
</div>
