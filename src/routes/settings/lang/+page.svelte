<script lang="ts">
    import i18n, { langOptions, type langOptionsType, setLang } from "$lib/shared/i18n.svelte";
    let lang: "default" | langOptionsType = $state("default");
</script>

<!-- <div class="card w-full max-w-md preset-filled-surface-100-900 p-4"> -->
<form class="space-y-2 p-6">
    <label class="flex items-center space-x-2 p-1">
        <input
            class="radio"
            type="radio"
            name="radio-direct"
            onclick={() => setLang(navigator.language)}
            value="default"
            bind:group={lang}
        />

        <p>{i18n().Settings.Lang.default}</p>
    </label>
    {#each langOptions as option, idx}
        <label class="flex items-center space-x-2 p-1">
            <input
                class="radio"
                type="radio"
                name="radio-direct"
                onclick={() => setLang(option)}
                value={option}
                bind:group={lang}
            />

            <p>{i18n().Settings.Lang[option as langOptionsType]}</p>
        </label>
    {/each}
</form>

<!-- </div> -->

<style>
    * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }

    *:focus {
        outline: none !important;
        box-shadow: none !important;
    }
</style>
