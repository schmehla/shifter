<script lang="ts">
    import i18n from "$lib/shared/i18n.svelte";

    let username: string = $state(localStorage.getItem("username") ?? "");
    let password: string = $state(localStorage.getItem("password") ?? "");

    function storeCredentials() {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    }
</script>

<span>{i18n().Settings.ical.explanation}</span>
<br />
<br />
<form class="mx-auto w-full max-w-md space-y-4">
    <label class="label">
        <span class="label-text">{i18n().Settings.ical.username}</span>
        <input
            type="text"
            name="username"
            id="username"
            autocomplete="username"
            class="input"
            placeholder={i18n().Settings.ical.usernamePlaceholder}
            bind:value={username}
        />
        <br />
        <span class="label-text">{i18n().Settings.ical.password}</span>
        <input
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            class="input"
            placeholder={i18n().Settings.ical.passwordPlaceholder}
            bind:value={password}
        />
    </label>

    <button type="button" class="btn preset-filled-primary-500 w-full" onclick={storeCredentials}
        >{i18n().general.save}</button
    >
</form>
