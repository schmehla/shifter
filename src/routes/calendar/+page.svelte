<script lang="ts">
    import SunMoon from "@lucide/svelte/icons/sun-moon";
    import Pencil from "@lucide/svelte/icons/pencil";
    import Home from "@lucide/svelte/icons/home";
    import Save from "@lucide/svelte/icons/save";
    import { FAB_TYPES, setFab } from "$lib/shared/fab.svelte";
    import { db, publishIcal, queryShiftdaysRange, type Shift } from "$lib/services/db";
    import { liveQuery } from "dexie";
    import { swipe, type SwipeCustomEvent } from "svelte-gestures";

    import { appbarState } from "$lib/shared/appbar-state.svelte";
    import i18n from "$lib/shared/i18n.svelte";

    // In Date(), week starts with Sunday, get/setDay is zero-indexed
    // get/setDate is one-indexed
    const WEEKS = 6;
    // const WEEK = ["S", "M", "T", "W", "T", "F", "S"];
    // const WEEK_START = 1; // Monday
    const WEEK_LEN = $derived(i18n().Calendar.week.length);

    interface Day {
        weekday: number;
        date: Date;
        dayInMonth: number;
        currentMonth: boolean;
        today: boolean;
        shift: Shift | null;
    }

    function getDayString(day: number) {
        return i18n().Calendar.week[(day + i18n().Calendar.week_start) % WEEK_LEN];
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

    function getDate(year: number, month: number, date: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(date);
        return d;
    }

    function isToday(year: number, month: number, date: number) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(date);
        const now = new Date();
        return d.toDateString() == now.toDateString();
    }

    function getCalendar(year: number, month: number, shifts: Shift[]) {
        let prefixLen = getFirstWeekday(year, month) - i18n().Calendar.week_start;
        if (prefixLen < 0) {
            prefixLen += WEEK_LEN;
        }
        let cal = new Array<Day>(WEEKS * WEEK_LEN);
        for (let i = 0; i < WEEKS; ++i) {
            for (let j = 0; j < WEEK_LEN; ++j) {
                const idx = i * WEEK_LEN + j;
                const day = idx - prefixLen + 1; // +1 because date is one-indexed
                const date = getDate(year, month, day);
                const moduloDay = date.getDate();
                cal[idx] = {
                    weekday: j,
                    date: date,
                    dayInMonth: moduloDay,
                    currentMonth: day > 0 && day <= getMonthLength(year, month),
                    today: isToday(year, month, day),
                    shift: null,
                };
            }
        }
        for (let s of shifts) {
            for (let day of cal) {
                if (
                    day.date.getDate() == s.day &&
                    day.date.getMonth() == s.month &&
                    day.date.getFullYear() == s.year
                ) {
                    day.shift = s;
                }
            }
        }
        return cal;
    }

    let focus = $state(newFocus());

    function newFocus() {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
        };
    }

    let editMode = $state(false);
    let shifts: Shift[] = $state([]);
    let selectedTemplateId = $state(1);

    $effect(() => {
        setFab(FAB_TYPES.BUTTON, {
            icon: editMode ? Save : Pencil,
            onclick: () => {
                editMode = !editMode;
            },
        });
        if (!editMode) {
            publishIcal();
        }
    });

    function toggleShift(templateID: number, idx: number) {
        const date: Date = cal[idx].date;
        if (cal[idx].shift == null) {
            db.shiftdays.add({
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                templateID: templateID,
            });
        } else {
            db.shiftdays.delete([date.getFullYear(), date.getMonth(), date.getDate()]);
        }
    }

    let cal = $derived.by(() => getCalendar(focus.year, focus.month, shifts));
    appbarState.icon = Home;
    appbarState.onclick = () => (focus = newFocus());

    liveQuery(() => queryShiftdaysRange(new Date(focus.year, focus.month), 1, 1)).subscribe({
        next: (val) => (shifts = val),
    });

    function handleSwipe(event: SwipeCustomEvent) {
        const dir = event.detail.direction;
        if (dir == "right") focus.month -= 1;
        if (dir == "left") focus.month += 1;
    }

    $effect(() => {
        if (focus.month >= 12) {
            focus.year += 1;
            focus.month = 0;
        }
        if (focus.month < 0) {
            focus.year -= 1;
            focus.month = 11;
        }
        appbarState.title = `${i18n().Calendar.months[focus.month]} ${focus.year}`;
    });
</script>

<!-- {day.currentMonth ? '' : 'text-surface-800'} -->

<div
    class={`grid my-grid grid-cols-7 grid-rows-7 h-full`}
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
    onswipe={handleSwipe}
>
    {#each i18n().Calendar.week as _, weekday}
        <div
            class="text-xs text-center h-auto border-gray-300 dark:border-gray-700 border-b-1 pb-2 {weekday ==
            WEEK_LEN - 1
                ? ''
                : 'border-r-1'}"
        >
            {getDayString(weekday)}
        </div>
    {/each}
    {#each cal as day, idx}
        <div
            class="relative border-gray-300 dark:border-gray-700 h-full {idx >=
            (WEEKS - 1) * WEEK_LEN
                ? ''
                : 'border-b-1'} {idx % WEEK_LEN == WEEK_LEN - 1 ? '' : 'border-r-1'}"
        >
            <div
                class="flex flex-col items-center p-2 h-full rounded-lg {day.currentMonth
                    ? ''
                    : 'brightness-200 dark:brightness-30'} {day.today ? 'bg-primary-500' : ''}"
            >
                <span class="text-sm font-bold">{day.dayInMonth}</span>
                <button
                    class="m-auto aspect-square w-full p-1"
                    onclick={() => editMode && toggleShift(selectedTemplateId, idx)}
                >
                    {#if day.shift}
                        <SunMoon class="bg-secondary-500 w-full p-1 rounded-full h-full" />
                    {/if}
                    {#if !day.shift && editMode}
                        <div class="border-2 border-dotted w-full p-1 rounded-full h-full"></div>
                    {/if}
                </button>
            </div>
        </div>
    {/each}
</div>

<style>
    .my-grid {
        grid-template-rows: auto repeat(6, 1fr);
    }
</style>
