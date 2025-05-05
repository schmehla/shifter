import type { IconProps } from "@lucide/svelte";
import type { Component } from "svelte";

interface FAB {
    icon: null | Component<IconProps, {}, "">;
    onClick: null | (() => void);
    href: string;
}

export const fab: FAB = $state({
    icon: null,
    onClick: null,
    href: null,
});
