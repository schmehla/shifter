<script lang="ts">
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import Listing from "$lib/components/Listing.svelte";
    // Icons
    import SunMoon from "@lucide/svelte/icons/sun-moon";
    import Diamond from "@lucide/svelte/icons/diamond";
    import Heart from "@lucide/svelte/icons/heart";
    import Spade from "@lucide/svelte/icons/spade";
    import i18n from "$lib/shared/i18n.svelte";

    import { FAB_TYPES, setFab } from "$lib/shared/fab.svelte";

    let lorem = "boboobob";
    let value = $state(["club"]);

    setFab(FAB_TYPES.NONE, {});
</script>

<span>Eins</span>
<Listing
    items={[i18n().Settings.ical, i18n().Settings.theme, i18n().Settings.lang]}
    hrefs={["settings/ical", "settings/theme", "settings/lang"]}
/>

<span>Zwei</span>
<Listing
    items={[
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
        "a",
    ]}
/>
