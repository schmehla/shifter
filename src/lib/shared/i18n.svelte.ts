import en from "../../locales/en.json";
import de from "../../locales/de.json";

const languages = {
    en,
    de,
};

export let langOptions = Object.keys(languages);
export type langOptionsType = keyof typeof languages;

let selectedLang = $state<{ val: langOptionsType }>({
    val: "en",
});

let translations = $derived(languages[selectedLang.val]);

function i18n() {
    return translations;
}

export function setLang(lang: string) {
    if (langOptions.includes(lang)) {
        selectedLang.val = lang as langOptionsType;
    }
}

export default i18n;
