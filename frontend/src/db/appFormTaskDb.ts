import Dexie, { type EntityTable } from "dexie";

interface AppFormTask {
  id?: number;
  name: string;
  mobileNumber: string;
}

const appFormTaskDb = new Dexie("AppFormTaskDb") as Dexie & {
  tasks: EntityTable<AppFormTask, "id">;
};

// Schema declaration:
appFormTaskDb.version(1).stores({
  tasks: "++id, name, mobileNumber",
});

const addFormTask = async (task: AppFormTask) => {
  await appFormTaskDb.tasks.add(task);
};
