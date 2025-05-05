<script lang="ts">
    import SunMoon from "@lucide/svelte/icons/sun-moon";
    import { type ListItem } from "$lib/services/db";

    interface Props {
        items: SvelteStore<ListItem[]>;
    }

    let { items } = $props();
</script>

<div class="card preset-filled-surface-100-900">
    <ul class="list">
        {#each $items as item, idx (item.id)}
            <li class="list-item">
                <a class="w-full px-6 py-3 flex items-center" href={`templates/${item.id}`}>
                    <!-- TODO remove href  -->
                    <SunMoon size={18} class="mr-6" />
                    <span>{item.title}</span>
                </a>
            </li>
            {#if idx !== $items.length - 1}
                <hr class="hr" />
            {/if}
        {/each}
    </ul>
</div>
