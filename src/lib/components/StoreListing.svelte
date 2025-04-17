<script lang="ts">
    import { page } from "$app/state";
    import SunMoon from "@lucide/svelte/icons/sun-moon";

    interface Props {
        items: SvelteStore<{ title: string; id: number }[]>;
    }

    let { items } = $props();
</script>

<div class="card preset-filled-surface-100-900">
    <ul class="list">
        {#each $items as item, idx (item.id)}
            <li class="list-item">
                <a class="w-full px-6 py-3 flex items-center" href={`template/${item.id}`}>
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
