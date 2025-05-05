import { page } from "$app/state"; // TODO
import { goto } from "$app/navigation";

export function goBack() {
    const path = page.url.pathname;
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
        goto(`/${segments[segments.length - 2]}`);
    }
}
