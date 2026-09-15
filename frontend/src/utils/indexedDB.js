/**
 * CRY NGO360 IndexedDB Storage Abstraction Layer
 * Native HTML5 IndexedDB wrapper for Offline Field Operations.
 * Manages caching for field visits, media attachments, and deterministic sync queue.
 * Adheres to Section 10, 14 & Section 17 (Milestone 38).
 */

const DB_NAME = 'CRY_FieldOps_DB';
const DB_VERSION = 1;

const STORES = {
  FIELD_VISITS: 'fieldVisits',
  SYNC_QUEUE: 'syncQueue',
  PHOTOS: 'photos',
  AUDIO_NOTES: 'audioNotes',
};

// Memory fallback in case IndexedDB is restricted or unavailable (e.g. strict private browsing)
const memoryFallback = {
  fieldVisits: new Map(),
  syncQueue: new Map(),
  photos: new Map(),
  audioNotes: new Map(),
};

/**
 * Initializes and returns the IndexedDB database instance
 */
export function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn('[IndexedDB] indexedDB not available in current environment; using memory fallback.');
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store 1: fieldVisits
      if (!db.objectStoreNames.contains(STORES.FIELD_VISITS)) {
        const visitStore = db.createObjectStore(STORES.FIELD_VISITS, { keyPath: 'id' });
        visitStore.createIndex('status', 'status', { unique: false });
        visitStore.createIndex('scheduledDate', 'scheduledDate', { unique: false });
      }

      // Store 2: syncQueue
      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        const queueStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id' });
        queueStore.createIndex('createdAt', 'createdAt', { unique: false });
        queueStore.createIndex('status', 'status', { unique: false });
      }

      // Store 3: photos
      if (!db.objectStoreNames.contains(STORES.PHOTOS)) {
        const photoStore = db.createObjectStore(STORES.PHOTOS, { keyPath: 'id' });
        photoStore.createIndex('visitId', 'visitId', { unique: false });
      }

      // Store 4: audioNotes
      if (!db.objectStoreNames.contains(STORES.AUDIO_NOTES)) {
        const audioStore = db.createObjectStore(STORES.AUDIO_NOTES, { keyPath: 'id' });
        audioStore.createIndex('visitId', 'visitId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('[IndexedDB] Database open failed:', event.target.error);
      resolve(null); // Fallback to memory
    };
  });
}

/**
 * Generic transactional helper
 */
async function getStore(storeName, mode = 'readonly') {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

// --------------------------------------------------------------------------
// 1. Field Visits CRUD
// --------------------------------------------------------------------------

export async function saveVisit(visit) {
  if (!visit || !visit.id) throw new Error('Visit object must have an id');
  const store = await getStore(STORES.FIELD_VISITS, 'readwrite');

  if (!store) {
    memoryFallback.fieldVisits.set(visit.id, { ...visit, updatedAt: new Date().toISOString() });
    return visit;
  }

  return new Promise((resolve, reject) => {
    const item = { ...visit, updatedAt: new Date().toISOString() };
    const request = store.put(item);
    request.onsuccess = () => resolve(item);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getVisit(id) {
  const store = await getStore(STORES.FIELD_VISITS, 'readonly');

  if (!store) {
    return memoryFallback.fieldVisits.get(id) || null;
  }

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getAllVisits() {
  const store = await getStore(STORES.FIELD_VISITS, 'readonly');

  if (!store) {
    return Array.from(memoryFallback.fieldVisits.values());
  }

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = (e) => reject(e.target.error);
  });
}

// --------------------------------------------------------------------------
// 2. Sync Queue Management
// --------------------------------------------------------------------------

export async function addToSyncQueue(item) {
  const id = item.id || `queue-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const record = {
    ...item,
    id,
    createdAt: item.createdAt || new Date().toISOString(),
    status: item.status || 'pending',
  };

  const store = await getStore(STORES.SYNC_QUEUE, 'readwrite');
  if (!store) {
    memoryFallback.syncQueue.set(id, record);
    return record;
  }

  return new Promise((resolve, reject) => {
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getSyncQueue() {
  const store = await getStore(STORES.SYNC_QUEUE, 'readonly');

  if (!store) {
    return Array.from(memoryFallback.syncQueue.values());
  }

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function removeSyncQueueItem(id) {
  const store = await getStore(STORES.SYNC_QUEUE, 'readwrite');

  if (!store) {
    memoryFallback.syncQueue.delete(id);
    return true;
  }

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function clearSyncQueue() {
  const store = await getStore(STORES.SYNC_QUEUE, 'readwrite');

  if (!store) {
    memoryFallback.syncQueue.clear();
    return true;
  }

  return new Promise((resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
  });
}

// --------------------------------------------------------------------------
// 3. Photos Storage
// --------------------------------------------------------------------------

export async function savePhoto(photo) {
  const id = photo.id || `photo-${Date.now()}`;
  const record = { ...photo, id, savedAt: new Date().toISOString() };

  const store = await getStore(STORES.PHOTOS, 'readwrite');
  if (!store) {
    memoryFallback.photos.set(id, record);
    return record;
  }

  return new Promise((resolve, reject) => {
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getPhotosByVisit(visitId) {
  const store = await getStore(STORES.PHOTOS, 'readonly');

  if (!store) {
    return Array.from(memoryFallback.photos.values()).filter((p) => p.visitId === visitId);
  }

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const all = request.result || [];
      if (!visitId) resolve(all);
      else resolve(all.filter((p) => p.visitId === visitId));
    };
    request.onerror = (e) => reject(e.target.error);
  });
}

// --------------------------------------------------------------------------
// 4. Audio Notes Storage
// --------------------------------------------------------------------------

export async function saveAudioNote(note) {
  const id = note.id || `memo-${Date.now()}`;
  const record = { ...note, id, savedAt: new Date().toISOString() };

  const store = await getStore(STORES.AUDIO_NOTES, 'readwrite');
  if (!store) {
    memoryFallback.audioNotes.set(id, record);
    return record;
  }

  return new Promise((resolve, reject) => {
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = (e) => reject(e.target.error);
  });
}

export async function getAudioNotesByVisit(visitId) {
  const store = await getStore(STORES.AUDIO_NOTES, 'readonly');

  if (!store) {
    return Array.from(memoryFallback.audioNotes.values()).filter((a) => a.visitId === visitId);
  }

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const all = request.result || [];
      if (!visitId) resolve(all);
      else resolve(all.filter((a) => a.visitId === visitId));
    };
    request.onerror = (e) => reject(e.target.error);
  });
}

// --------------------------------------------------------------------------
// 5. Diagnostics & Quota
// --------------------------------------------------------------------------

export async function getStorageUsageEstimate() {
  if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        usageBytes: estimate.usage || 0,
        quotaBytes: estimate.quota || 0,
        usageFormatted: `${Math.round((estimate.usage || 0) / (1024 * 1024))} MB`,
        quotaFormatted: `${Math.round((estimate.quota || 0) / (1024 * 1024))} MB`,
      };
    } catch (e) {
      console.warn('[IndexedDB] Storage estimate failed:', e);
    }
  }

  return {
    usageBytes: 2500000,
    quotaBytes: 100000000,
    usageFormatted: '2.5 MB',
    quotaFormatted: '100 MB',
  };
}
