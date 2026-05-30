import { neon } from '@neondatabase/serverless'

const DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL as string | undefined
export const likesEnabled = Boolean(DATABASE_URL)

// Empty authToken = anonymous/public access via Neon Authorize.
const sql = DATABASE_URL ? neon(DATABASE_URL, { authToken: async () => '' }) : null

export async function fetchLikeCounts(): Promise<Record<string, number>> {
  if (!sql) return {}
  const rows = await sql`SELECT photo_id, likes FROM photo_likes` as { photo_id: string; likes: number }[]
  return Object.fromEntries(rows.map((r) => [r.photo_id, r.likes]))
}

export async function incrementLike(pid: string): Promise<number> {
  if (!sql) return 0
  const rows = await sql`
    INSERT INTO photo_likes (photo_id, likes) VALUES (${pid}, 1)
    ON CONFLICT (photo_id) DO UPDATE SET likes = photo_likes.likes + 1
    RETURNING likes AS count
  ` as { count: number }[]
  return rows[0]?.count ?? 0
}

export async function decrementLike(pid: string): Promise<number> {
  if (!sql) return 0
  const rows = await sql`
    UPDATE photo_likes SET likes = GREATEST(likes - 1, 0)
    WHERE photo_id = ${pid}
    RETURNING likes AS count
  ` as { count: number }[]
  return rows[0]?.count ?? 0
}
