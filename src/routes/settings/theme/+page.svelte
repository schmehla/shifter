<script lang="ts">
    let themeOptions = ["automatic", "light", "dark"];
    let themeLabels = ["Automatic", "Light", "Dark"];
    let theme = $state("automatic");

    // new

    import * as radio from "@zag-js/radio-group";
    import { useMachine, normalizeProps } from "@zag-js/svelte";

    const items = [
        { id: "apple", label: "Apples" },
        { id: "orange", label: "Oranges" },
        { id: "mango", label: "Mangoes" },
        { id: "grape", label: "Grapes" },
    ];

    const id = $props.id();
    const service = useMachine(radio.machine, {
        id,
        name: "fruit",
    });
    const api = $derived(radio.connect(service, normalizeProps));
</script>

<div class="card w-full max-w-md preset-filled-surface-100-900 p-4">
    <fieldset>
        {#each themeOptions as option, idx}
            <div class="ml-2">
                <input type="radio" bind:group={theme} value={option} />
                <label for={option} class="ml-2">{themeLabels[idx]}</label>
            </div>
            {#if idx !== themeOptions.length - 1}
                <hr class="hr my-3" />
            {/if}
        {/each}
    </fieldset>
</div>

<div {...api.getRootProps()}>
    <h3 {...api.getLabelProps()}>Fruits</h3>
    {#each items as opt}
        <label {...api.getItemProps({ value: opt.id })}>
            <span {...api.getItemTextProps({ value: opt.id })}>{opt.label}</span>
            <input {...api.getItemHiddenInputProps({ value: opt.id })} />
            <div {...api.getItemControlProps({ value: opt.id })}></div>
        </label>
    {/each}
</div>

Copy
