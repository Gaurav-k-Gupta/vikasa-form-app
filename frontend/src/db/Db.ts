import Dexie from 'dexie';

// interfaces for each store.
export interface FormSubmission {
    id?: number;
    data: any;       // We can define a more specific type if needed.
    timestamp: number;
}

export interface QueueStatus {
    id?: number;
    status: string;
    updatedAt: number;
}

export interface AppSetting {
    id?: number;
    key: string;
    value: any;
}

// Extend Dexie to define our database schema.
class MyAppDB extends Dexie {

    formSubmissions: Dexie.Table<FormSubmission, number>;
    queueStatus: Dexie.Table<QueueStatus, number>;
    appSettings: Dexie.Table<AppSetting, number>;

    constructor() {

        super('MyAppDB');

        this.version(1).stores({
            formSubmissions: '++id, timestamp',
            queueStatus: '++id, status, updatedAt',
            appSettings: '++id, key'
        });

        this.formSubmissions = this.table('formSubmissions');
        this.queueStatus = this.table('queueStatus');
        this.appSettings = this.table('appSettings');
    }
}

export const db = new MyAppDB();
