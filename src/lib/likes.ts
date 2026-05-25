// Talks to the Neon Data API (PostgREST). Anonymous requests need no auth
// header — access is governed by GRANTs on the `anonymous` role (see db/likes.sql).

const RAW = import.meta.env.VITE_NEON_DATA_API_URL
const BASE = RAW ? RAW.replace(/\/+$/, '') + '/rest/v1' : null

export const likesEnabled = BASE !== null

const jsonHeaders = { 'Content-Type': 'application/json' }

export async function fetchLikeCounts(): Promise<Record<string, number>> {
  if (!BASE) return {}
  const res = await fetch(`${BASE}/photo_likes?select=photo_id,likes`, {
    headers: jsonHeaders,
  })
  if (!res.ok) throw new Error(`Failed to load likes (${res.status})`)
  const rows = (await res.json()) as { photo_id: string; likes: number }[]
  return Object.fromEntries(rows.map((r) => [r.photo_id, r.likes]))
}

async function rpc(fn: 'increment_like' | 'decrement_like', pid: string): Promise<number> {
  if (!BASE) return 0
  const res = await fetch(`${BASE}/rpc/${fn}`, {
    method: 'POST',
    headers: { ...jsonHeaders, Accept: 'application/json' },
    body: JSON.stringify({ pid }),
  })
  if (!res.ok) throw new Error(`Like request failed (${res.status})`)
  const data = await res.json()
  if (typeof data === 'number') return data
  if (Array.isArray(data)) return Number(data[0]) || 0
  return Number(data) || 0
}

export const incrementLike = (pid: string) => rpc('increment_like', pid)
export const decrementLike = (pid: string) => rpc('decrement_like', pid)
