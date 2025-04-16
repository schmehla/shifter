<script lang="ts">
    import { page } from "$app/state";
    import SunMoon from "@lucide/svelte/icons/sun-moon";

    let items = ["alter", "was", "geht", "ab"];
</script>

<div class="card preset-filled-surface-100-900 m-4">
    <ul class="list">
        {#each items as item, idx}
            <li class="list-item">
                <a class="w-full px-6 py-3 flex items-center" href="settings/theme">
                    <SunMoon size={18} class="mr-6" />
                    <span>{item}</span>
                </a>
            </li>
            {#if idx !== items.length - 1}
                <hr class="hr" />
            {/if}
        {/each}
    </ul>
</div>
