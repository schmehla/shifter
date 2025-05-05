<script lang="ts">
    import { get } from "svelte/store";
    import SunMoon from "@lucide/svelte/icons/sun-moon";
    import Pencil from "@lucide/svelte/icons/pencil";
    import { fab } from "$lib/shared/fab.svelte";

    // In Date(), week starts with Sunday, get/setDay is zero-indexed
    // get/setDate is one-indexed
    const WEEKS = 6;

    const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

    const WEEK_START = 1; // Monday

    interface Day {
        weekday: number;
        date: number;
        currentMonth: boolean;
        today: boolean;
    }

    function getDayString(day: number) {
        return WEEK[(day + WEEK_START) % WEEK.length];
    }

    function getFirstWeekday(year: number, month: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(1);
        return d.getDay();
    }

    function getMonthLength(year: number, month: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month + 1);
        d.setDate(0);
        return d.getDate();
    }

    function getModuloDate(year: number, month: number, date: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(date);
        return d.getDate();
    }

    function isToday(year: number, month: number, date: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(date);
        const now = new Date();
        return d.toDateString() == now.toDateString();
    }

    function getCalendar(year: number, month: number) {
        let prefixLen = getFirstWeekday(year, month) - WEEK_START;
        if (prefixLen < 0) {
            prefixLen += WEEK.length;
        }
        let cal = new Array<Day>(WEEKS * WEEK.length);
        for (let i = 0; i < WEEKS; ++i) {
            for (let j = 0; j < WEEK.length; ++j) {
                const idx = i * WEEK.length + j;
                const date = idx - prefixLen + 1; // +1 because date is one-indexed
                const moduloDate = getModuloDate(year, month, date);
                cal[idx] = {
                    weekday: j,
                    date: moduloDate,
                    currentMonth: date > 0 && date <= getMonthLength(year, month),
                    today: isToday(year, month, date),
                };
            }
        }
        return cal;
    }

    let cal = getCalendar(2025, 3);
    fab.icon = Pencil;
    fab.onClick = () => console.log("lel");
</script>

<!-- {day.currentMonth ? '' : 'text-surface-800'} -->

<div class={`grid my-grid grid-cols-7 grid-rows-7 h-full`}>
    {#each WEEK as _, weekday}
        <div
            class="text-xs text-center h-auto border-gray-300 dark:border-gray-700 border-b-1 pb-2 {weekday ==
            WEEK.length - 1
                ? ''
                : 'border-r-1'}"
        >
            {getDayString(weekday)}
        </div>
    {/each}
    {#each cal as day, idx}
        <div
            class="relative border-gray-300 dark:border-gray-700 h-full {idx >=
            (WEEKS - 1) * WEEK.length
                ? ''
                : 'border-b-1'} {idx % WEEK.length == WEEK.length - 1 ? '' : 'border-r-1'}"
        >
            <div
                class="flex flex-col items-center p-2 h-full rounded-lg {day.currentMonth
                    ? ''
                    : 'brightness-200 dark:brightness-30'} {day.today ? 'bg-primary-500' : ''}"
            >
                <span class="text-sm font-bold">{day.date}</span>
                <SunMoon class="m-auto bg-secondary-500 w-full p-0.5 rounded-full" />
            </div>
        </div>
    {/each}
</div>

<style>
    .my-grid {
        grid-template-rows: min-content;
    }
</style>
