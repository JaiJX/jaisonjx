// Talks to the MongoDB Atlas Data API on behalf of the browser.
// Set VITE_MONGODB_DATA_API_URL and VITE_MONGODB_API_KEY to enable likes.
// Restrict the API key in Atlas to read + findOneAndUpdate on photo_likes only.

const DATA_API_URL = import.meta.env.VITE_MONGODB_DATA_API_URL
const API_KEY = import.meta.env.VITE_MONGODB_API_KEY
const DATA_SOURCE = import.meta.env.VITE_MONGODB_DATA_SOURCE ?? 'Cluster0'
const DATABASE = import.meta.env.VITE_MONGODB_DATABASE ?? 'portfolio'
const COLLECTION = 'photo_likes'

export const likesEnabled = !!(DATA_API_URL && API_KEY)

async function action<T>(name: string, body: object): Promise<T> {
  const res = await fetch(`${DATA_API_URL}/action/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY!,
    },
    body: JSON.stringify({ dataSource: DATA_SOURCE, database: DATABASE, collection: COLLECTION, ...body }),
  })
  if (!res.ok) throw new Error(`MongoDB Data API error (${res.status})`)
  return res.json()
}

/**
 * Fetches all photo like counts from MongoDB.
 * @returns Map of photo_id → like count.
 */
export async function fetchLikeCounts(): Promise<Record<string, number>> {
  if (!likesEnabled) return {}
  const { documents } = await action<{ documents: { photo_id: string; likes: number }[] }>('find', {
    projection: { photo_id: 1, likes: 1, _id: 0 },
  })
  return Object.fromEntries((documents ?? []).map(d => [d.photo_id, d.likes]))
}

async function updateLike(pid: string, delta: 1 | -1): Promise<number> {
  if (!likesEnabled) return 0
  // Decrement filter guards against going below zero.
  const filter = delta === -1 ? { photo_id: pid, likes: { $gt: 0 } } : { photo_id: pid }
  const { document } = await action<{ document: { likes: number } | null }>('findOneAndUpdate', {
    filter,
    update: { $inc: { likes: delta }, $setOnInsert: { photo_id: pid } },
    upsert: delta === 1,
    returnNewDocument: true,
    projection: { likes: 1, _id: 0 },
  })
  return document?.likes ?? 0
}

/** Atomically increments the like count for a photo. Returns the new count. */
export const incrementLike = (pid: string) => updateLike(pid, 1)

/** Atomically decrements the like count for a photo (never below zero). Returns the new count. */
export const decrementLike = (pid: string) => updateLike(pid, -1)
