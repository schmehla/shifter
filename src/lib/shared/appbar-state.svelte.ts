import Home from "@lucide/svelte/icons/home";

export let appbarState = $state({
    title: "",
    icon: Home,
    onclick: () => {},
});
