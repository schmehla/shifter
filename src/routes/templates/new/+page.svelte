<script lang="ts">
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { db } from "$lib/services/db";

    let title: string = $state("");
    let fullDay = $state(false);
    let start = $state("09:00");
    let end = $state("17:00");

    async function storeTemplate() {
        try {
            const id = await db.templates.add({
                title,
                fullDay,
                start,
                end,
            });
        } catch (error) {
            console.error(error);
        }
    }
</script>

<form class="mx-auto w-full max-w-md space-y-4">
    <label class="label">
        <span class="label-text">Title</span>
        <input type="text" class="input" placeholder="Enter title" bind:value={title} />
    </label>
    <!-- --- -->
    <label class="label flex-0 mr-4">
        <span class="label-text">Full day</span>
        <Switch checked={fullDay} onCheckedChange={(e) => (fullDay = e.checked)} />
    </label>
    {#if !fullDay}
        <div class="flex">
            <label class="label mr-2">
                <span class="label-text">Start</span>
                <input type="time" class="input" bind:value={start} />
            </label>
            <!-- --- -->
            <label class="label ml-2">
                <span class="label-text">End</span>
                <input type="time" class="input" bind:value={end} />
            </label>
        </div>
    {/if}
    <button type="button" class="btn preset-filled-primary-500 w-full" onclick={storeTemplate}
        >Add</button
    >
</form>
