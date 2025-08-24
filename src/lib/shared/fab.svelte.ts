import ButtonFAB from "$lib/components/ButtonFAB.svelte";
import HrefFAB from "$lib/components/HrefFAB.svelte";
import type { Component } from "svelte";

export enum FAB_TYPES {
    NONE,
    BUTTON,
    HREF,
}

interface FAB {
    type: FAB_TYPES;
    component: Component | null;
    props: any;
}

export let fab: FAB = $state({
    type: FAB_TYPES.NONE,
    component: null,
    props: {},
});

export function setFab(type: FAB_TYPES, props: any) {
    switch (type) {
        case FAB_TYPES.NONE:
            fab.component = null;
            break;
        case FAB_TYPES.BUTTON:
            fab.component = ButtonFAB;
            break;
        case FAB_TYPES.HREF:
            fab.component = HrefFAB;
            break;
        default:
            break;
    }
    fab.type = type;
    fab.props = props;
}
