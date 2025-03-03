import { db, FormSubmission, QueueStatus, AppSetting } from '../db/Db';


/* --------- Form Submissions Operations --------- */
export const addFormSubmission = async (data: any): Promise<number> => {
    try {
        return await db.formSubmissions.add({
            data,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error('Error adding form submission:', error);
        throw error;
    }
};

export const getFormSubmissions = async (): Promise<FormSubmission[]> => {
    try {
        return await db.formSubmissions.toArray();
    } catch (error) {
        console.error('Error retrieving form submissions:', error);
        throw error;
    }
};

export const updateFormSubmission = async (
    id: number,
    updatedData: Partial<FormSubmission>
): Promise<number> => {
    try {
        const updated = await db.formSubmissions.update(id, updatedData);
        if (updated === 0) {
            throw new Error('No form submission found to update');
        }
        return updated;
    } catch (error) {
        console.error('Error updating form submission:', error);
        throw error;
    }
};

export const deleteFormSubmission = async (id: number): Promise<void> => {
    try {
        await db.formSubmissions.delete(id);
    } catch (error) {
        console.error('Error deleting form submission:', error);
        throw error;
    }
};



/* --------- Queue Status Operations --------- */
export const addQueueStatus = async (status: string): Promise<number> => {
    try {
        return await db.queueStatus.add({
            status,
            updatedAt: Date.now(),
        });
    } catch (error) {
        console.error('Error adding queue status:', error);
        throw error;
    }
};

export const getQueueStatus = async (): Promise<QueueStatus[]> => {
    try {
        return await db.queueStatus.toArray();
    } catch (error) {
        console.error('Error retrieving queue status:', error);
        throw error;
    }
};

export const updateQueueStatus = async (
    id: number,
    status: string
): Promise<number> => {
    try {
        const updated = await db.queueStatus.update(id, {
            status,
            updatedAt: Date.now(),
        });
        if (updated === 0) {
            throw new Error('No queue status found to update');
        }
        return updated;
    } catch (error) {
        console.error('Error updating queue status:', error);
        throw error;
    }
};

export const deleteQueueStatus = async (id: number): Promise<void> => {
    try {
        await db.queueStatus.delete(id);
    } catch (error) {
        console.error('Error deleting queue status:', error);
        throw error;
    }
};


/* --------- App Settings Operations --------- */

export const addAppSetting = async (key: string, value: any): Promise<number> => {
    try {
        return await db.appSettings.add({ key, value });
    } catch (error) {
        console.error('Error adding app setting:', error);
        throw error;
    }
};

export const updateAppSetting = async (key: string, value: any): Promise<number> => {
    try {
        const existing = await db.appSettings.where({ key }).first();
        if (!existing) {
            throw new Error(`No app setting found for key: ${key}`);
        }
        const updated = await db.appSettings.update(existing.id!, { value });
        if (updated === 0) {
            throw new Error(`Update failed for app setting with key: ${key}`);
        }
        return updated;
    } catch (error) {
        console.error('Error updating app setting:', error);
        throw error;
    }
};

export const getAppSetting = async (key: string): Promise<AppSetting | undefined> => {
    try {
        return await db.appSettings.where({ key }).first();
    } catch (error) {
        console.error('Error retrieving app setting:', error);
        throw error;
    }
};

export const deleteAppSetting = async (key: string): Promise<void> => {
    try {
        const setting = await db.appSettings.where({ key }).first();
        if (setting && setting.id) {
            await db.appSettings.delete(setting.id);
        }
    } catch (error) {
        console.error('Error deleting app setting:', error);
        throw error;
    }
};
