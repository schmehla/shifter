import Dexie, { type Table } from "dexie";
import { storeData } from "./pastebin";

const DB_NAME = "db";
const DB_VERSION = 1;

// TODO move somewhere else
export interface ListItem {
    id?: number;
    title: string;
}

export interface Template extends ListItem {
    fullDay: boolean;
    start: string;
    end: string;
}

export interface Shift {
    year: number;
    month: number;
    day: number;
    templateID: number;
}

export async function queryShiftdaysRange(date: Date, plusMonths: number, minusMonths: number) {
    let dateMonth = date.getMonth();
    let lower = new Date();
    lower.setMonth(dateMonth - minusMonths);
    let upper = new Date();
    upper.setMonth(dateMonth + plusMonths);
    return db.shiftdays
        .where(["year", "month"])
        .between(
            [lower.getFullYear(), lower.getMonth()],
            [upper.getFullYear(), upper.getMonth()],
            true,
            true,
        )
        .toArray();
}

async function joinShiftdaysAndTemplates() {
    const shiftdays: any[] = await queryShiftdaysRange(new Date(), 3, 3);

    await Promise.all(
        shiftdays.map(async (s) => {
            const t = await db.templates.get(s.templateID);
            Object.assign(s, t);
        }),
    );

    return shiftdays;
}

async function db2ical(): Promise<string> {
    let shiftdays = await joinShiftdaysAndTemplates();
    const body = shiftdays
        .map((s) => {
            const uid = `${s.year}-${s.month}-${s.day}`;
            const dtstamp = "20000101T000000Z";
            if (s.fullDay) {
                const start = `${s.year}${s.month}${s.day}`;
                return `BEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${dtstamp}\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${start}\nSUMMARY:${s.title}\nEND:VEVENT`;
            }
            const start = `${s.year}${s.month}${s.day}T${s.start.replace(":", "")}00`;
            const end = `${s.year}${s.month}${s.day}T${s.end.replace(":", "")}00`;
            return `BEGIN:VEVENT\nUID:${uid}\nDTSTAMP:${dtstamp}\nDTSTART;VALUE=DATE:${start}\nDTEND;VALUE=DATE:${end}\nSUMMARY:${s.title}\nEND:VEVENT`;
        })
        .join("\n");
    return "BEGIN:VCALENDAR\nVERSION:1.0\n" + body + "\nEND:VCALENDAR";
}

export async function publishIcal() {
    const ical = await db2ical();
    console.log(ical);
    storeData(ical);
}

class DB extends Dexie {
    templates!: Table<Template>;
    shiftdays!: Table<Shift>;

    constructor() {
        super(DB_NAME);
        this.version(DB_VERSION).stores({
            templates: "++id, title, fullDay, start, end",
            shiftdays: "[year+month+day], templateID",
        });
    }
}

export const db = new DB();
