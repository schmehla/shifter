<script lang="ts">
    import i18n from "$lib/shared/i18n.svelte";

    let themeOptions = ["system", "light", "dark"] as const;
    let theme = $state(themeOptions[0]);

    $effect(() => {
        if (theme == null) {
            localStorage.removeItem("theme");
        } else {
            localStorage.theme = theme;
        }
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
    });
</script>

<!-- <div class="card w-full max-w-md preset-filled-surface-100-900 p-4"> -->
<form class="space-y-2 p-6">
    {#each themeOptions as option, idx}
        <label class="flex items-center space-x-2 p-1">
            <input
                class="radio"
                type="radio"
                name="radio-direct"
                value={option}
                bind:group={theme}
            />
            <p>{i18n().Settings.Theme[option]}</p>
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
