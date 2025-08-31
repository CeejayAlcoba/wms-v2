import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { CheckInByICRDTO } from "../@types/DTOs/CheckInByICRDTO";
import type { PickListDetailsRecordDTO } from "../@types/DTOs/PickListDetailsRecordDTO";

type StoreName = "checkInByICR" | "pendingPickList";

export interface MyDB extends DBSchema {
  checkInByICR: {
    key: number;
    value: CheckInByICRDTO & { id: number };
  };
  pendingPickList: {
    key: number;
    value: PickListDetailsRecordDTO & { id: number };
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>>;

export function initDB() {
  dbPromise = openDB<MyDB>("DB_WMS", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("checkInByICR")) {
        db.createObjectStore("checkInByICR", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("pendingPickList")) {
        db.createObjectStore("pendingPickList", {
          keyPath: "id",
        });
      }
    },
  });
}

export function _indexDbService() {
  initDB();

  const addItem = async <K extends StoreName>(
    storeName: K,
    item: MyDB[K]["value"]
  ): Promise<MyDB[K]["key"]> => {
    const db = await dbPromise;
    return db.add(storeName, item);
  };

  const getItem = async <K extends StoreName>(
    storeName: K,
    key: MyDB[K]["key"]
  ): Promise<MyDB[K]["value"] | undefined> => {
    const db = await dbPromise;
    return db.get(storeName, key);
  };

  const updateItem = async <K extends StoreName>(
    storeName: K,
    key: MyDB[K]["key"],
    updates: Partial<MyDB[K]["value"]>
  ): Promise<boolean> => {
    const db = await dbPromise;
    const item = await db.get(storeName, key);
    if (!item) return false;

    const updatedItem = { ...item, ...updates };
    await db.put(storeName, updatedItem);
    return true;
  };

  const deleteItem = async (
    storeName: StoreName,
    key: number | IDBKeyRange
  ): Promise<void> => {
    const db = await dbPromise;
    await db.delete(storeName, key);
  };

  const getAllItems = async <K extends StoreName>(
    storeName: K
  ): Promise<MyDB[K]["value"][]> => {
    const db = await dbPromise;
    return db.getAll(storeName);
  };

  const getItemsByFilter = async <K extends StoreName>(
    storeName: K,
    filterFn: (item: MyDB[K]["value"]) => boolean
  ): Promise<MyDB[K]["value"][]> => {
    const db = await dbPromise;
    const all = await db.getAll(storeName);
    return all.filter(filterFn);
  };

  const getSingleItemByFilter = async <K extends StoreName>(
    storeName: K,
    filterFn: (item: MyDB[K]["value"]) => boolean
  ): Promise<MyDB[K]["value"] | undefined> => {
    const db = await dbPromise;
    const all = await db.getAll(storeName);
    return all.find(filterFn);
  };

  const upsertItem = async <K extends StoreName>(
    storeName: K,
    item: MyDB[K]["value"] & { id: MyDB[K]["key"] }
  ): Promise<MyDB[K]["key"]> => {
    const db = await dbPromise;
    const existing = await db.get(storeName, item.id);
    if (existing) {
      await db.put(storeName, { ...existing, ...item });
      return item.id;
    } else {
      return db.add(storeName, item);
    }
  };

  const clearAllItems = async <K extends StoreName>(
    storeName: K
  ): Promise<void> => {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.clear();
    await tx.done;
  };

  return {
    addItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
    getItemsByFilter,
    getSingleItemByFilter,
    upsertItem,
    clearAllItems,
  };
}

export const indexDbService = _indexDbService();
