<script lang="ts">
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { db, type Template } from "$lib/services/db";
    import { goBack } from "$lib/utils/goBack"; // TODO
    import { page } from "$app/state";

    import Trash from "@lucide/svelte/icons/trash";

    let idStr = page.params.templateID;
    let id = Number(idStr);
    let title: string = $state("");
    let fullDay = $state(false);
    let start = $state("09:00");
    let end = $state("17:00");
    let modified = $state(false);

    function isModeNew() {
        return idStr === "new";
    }

    async function storeTemplate() {
        try {
            const id = await db.templates.add({
                title,
                fullDay,
                start,
                end,
            });
            goBack();
        } catch (error) {
            console.error(error);
        }
    }

    async function readTemplate(id: number) {
        try {
            let template = await db.templates.get(id);
            if (template) {
                title = template.title;
                fullDay = template.fullDay;
                start = template.start;
                end = template.end;
                modified = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function updateTemplate(id: number) {
        try {
            await db.templates.update(id, {
                title,
                fullDay,
                start,
                end,
            });
            goBack();
        } catch (error) {
            console.error(error);
        }
    }

    if (!isModeNew()) {
        readTemplate(id);
    }

    $effect(() => {
        console.log(modified);
    });
</script>

<form class="mx-auto w-full max-w-md space-y-4">
    <label class="label">
        <span class="label-text">Title</span>
        <input
            type="text"
            class="input"
            placeholder="Enter title"
            bind:value={title}
            onchange={() => (modified = true)}
        />
    </label>
    <!-- --- -->
    <label class="label flex-0 mr-4">
        <span class="label-text">Full day</span>
        <Switch
            checked={fullDay}
            onCheckedChange={(e) => {
                fullDay = e.checked;
                modified = true;
            }}
        />
    </label>
    {#if !fullDay}
        <div class="flex">
            <label class="label">
                <span class="label-text">Start</span>
                <input
                    type="time"
                    class="input"
                    bind:value={start}
                    onchange={() => (modified = true)}
                />
            </label>
            <!-- spacing -->
            <div class="w-4"></div>
            <label class="label">
                <span class="label-text">End</span>
                <input
                    type="time"
                    class="input"
                    bind:value={end}
                    onchange={() => (modified = true)}
                />
            </label>
        </div>
    {/if}
    <div class="flex">
        {#if isModeNew()}
            <button
                type="button"
                class="btn preset-filled-primary-500 w-full"
                onclick={storeTemplate}>Add</button
            >
        {:else}
            <button type="button" class="btn preset-outlined w-full mr-4 flex-1">
                <Trash size={18} />
            </button>
            <button
                type="button"
                class="btn preset-filled-primary-500 w-full"
                disabled={!modified}
                onclick={() => updateTemplate(id)}>Save</button
            >
        {/if}
    </div>
</form>
