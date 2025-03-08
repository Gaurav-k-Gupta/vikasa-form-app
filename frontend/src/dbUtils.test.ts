import { db, FormSubmission } from './db/Db';
import {
  addFormSubmission,
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
  addQueueStatus,
  getQueueStatus,
  updateQueueStatus,
  deleteQueueStatus,
  addAppSetting,
  updateAppSetting,
  getAppSetting,
  deleteAppSetting,
} from './utils/dbUtils';

describe('IndexedDB Utilities', () => {
  // Clear the database before each test to ensure a clean state
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  describe('Form Submissions', () => {
    test('should add and retrieve a form submission', async () => {
      const data = { name: 'John Doe', message: 'Hello!' };
      const id = await addFormSubmission(data);
      expect(typeof id).toBe('number');

      const submissions: FormSubmission[] = await getFormSubmissions();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].data).toEqual(data);
    });

    test('should update a form submission', async () => {
      const data = { name: 'Jane Doe', message: 'Test update' };
      const id = await addFormSubmission(data);
      const newData = { data: { name: 'Jane Doe Updated', message: 'Updated message' } };

      const updatedCount = await updateFormSubmission(id, newData);
      expect(updatedCount).toBeGreaterThan(0);

      const submissions: FormSubmission[] = await getFormSubmissions();
      expect(submissions[0].data).toEqual(newData.data);
    });

    test('should delete a form submission', async () => {
      const data = { name: 'John Smith', message: 'Delete me' };
      const id = await addFormSubmission(data);
      await deleteFormSubmission(id);

      const submissions: FormSubmission[] = await getFormSubmissions();
      expect(submissions).toHaveLength(0);
    });
  });

  describe('Queue Status', () => {
    test('should add and retrieve a queue status', async () => {
      const status = 'pending';
      const id = await addQueueStatus(status);
      expect(typeof id).toBe('number');

      const statuses = await getQueueStatus();
      expect(statuses).toHaveLength(1);
      expect(statuses[0].status).toBe(status);
    });

    test('should update a queue status', async () => {
      const status = 'pending';
      const id = await addQueueStatus(status);
      const newStatus = 'completed';
      const updatedCount = await updateQueueStatus(id, newStatus);
      expect(updatedCount).toBeGreaterThan(0);

      const statuses = await getQueueStatus();
      expect(statuses[0].status).toBe(newStatus);
    });

    test('should delete a queue status', async () => {
      const status = 'failed';
      const id = await addQueueStatus(status);
      await deleteQueueStatus(id);
      const statuses = await getQueueStatus();
      expect(statuses).toHaveLength(0);
    });
  });

  describe('App Settings', () => {
    test('should add a new app setting', async () => {
      const key = 'theme';
      const value = 'dark';
      const id = await addAppSetting(key, value);
      expect(typeof id).toBe('number');

      const setting = await getAppSetting(key);
      expect(setting).toBeDefined();
      expect(setting?.value).toEqual(value);
    });

    test('should update an existing app setting', async () => {
      const key = 'language';
      const initialValue = 'en';
      await addAppSetting(key, initialValue);

      const newValue = 'fr';
      const updatedCount = await updateAppSetting(key, newValue);
      expect(updatedCount).toBeGreaterThan(0);

      const setting = await getAppSetting(key);
      expect(setting?.value).toEqual(newValue);
    });

    test('should delete an app setting', async () => {
      const key = 'currency';
      const value = 'USD';
      await addAppSetting(key, value);
      await deleteAppSetting(key);

      const setting = await getAppSetting(key);
      expect(setting).toBeUndefined();
    });
  });
});
