# MongoDB Collection Setup — Photo Likes

## Collection

Database: `portfolio` (configurable via `VITE_MONGODB_DATABASE`)  
Collection: `photo_likes`

### Document shape

```json
{
  "photo_id": "sunset.jpg",
  "likes": 42
}
```

`photo_id` should be treated as a unique key. Create a unique index on it:

```js
db.photo_likes.createIndex({ photo_id: 1 }, { unique: true })
```

## Atlas Data API setup

1. Go to **Atlas UI → App Services → Data API** and enable it for your cluster.
2. Copy the base URL — set it as `VITE_MONGODB_DATA_API_URL` in your `.env` and as the `MONGODB_DATA_API_URL` repo variable in GitHub.
3. Create a **Data API key**:
   - Scope it to the `portfolio` database and `photo_likes` collection only.
   - Allow: **Read** (`find`) and **Write** (`findOneAndUpdate`).
   - Set an IP allowlist or HTTP referrer restriction to your domain.
4. Set the key as `VITE_MONGODB_API_KEY` locally and as the `VITE_MONGODB_API_KEY` secret in GitHub Actions.

## How likes work

- **Read** — `find` with `projection: { photo_id, likes }` fetches all counts on page load.
- **Increment** — `findOneAndUpdate` with `{ $inc: { likes: 1 } }` and `upsert: true` creates the document on first like.
- **Decrement** — `findOneAndUpdate` with filter `{ likes: { $gt: 0 } }` and `{ $inc: { likes: -1 } }` prevents the count going below zero.

All mutations happen through the Atlas Data API; there are no server-side functions needed.
