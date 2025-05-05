import Dexie, { type Table } from "dexie";

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

class DB extends Dexie {
    templates!: Table<Template>;

    constructor() {
        super(DB_NAME);
        this.version(DB_VERSION).stores({
            templates: "++id, title, start, end",
        });
    }
}

export const db = new DB();
