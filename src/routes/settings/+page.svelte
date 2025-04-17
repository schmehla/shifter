<script lang="ts">
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import Listing from "$lib/components/Listing.svelte";
    // Icons
    import SunMoon from "@lucide/svelte/icons/sun-moon";
    import Diamond from "@lucide/svelte/icons/diamond";
    import Heart from "@lucide/svelte/icons/heart";
    import Spade from "@lucide/svelte/icons/spade";

    let lorem = "boboobob";
    let value = $state(["club"]);
</script>

<span>Eins</span>
<Listing
    items={["alter", "was", "geht"]}
    hrefs={["settings/theme", "settings/theme", "settings/theme"]}
/>

<span>Zwei</span>
<Listing items={["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"]} />
