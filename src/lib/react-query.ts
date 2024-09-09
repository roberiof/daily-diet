import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const clientStorage = {
  setItem: (key: string, value: string): void => {
    storage.set(key, value);
  },
  getItem: (key: string): string | null => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string): void => {
    storage.delete(key);
  }
};

export const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage
});
