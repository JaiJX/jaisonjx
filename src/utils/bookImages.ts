export type BookImageLinks = {
  extraLarge?: string
  large?: string
  medium?: string
  thumbnail?: string
  smallThumbnail?: string
}

export function buildStyledCoverUrl(volumeId: string): string {
  return `https://books.google.com/books/content?id=${volumeId}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`
}

export function getBookCoverUrl(
  imageLinks?: BookImageLinks,
  volumeId?: string,
): string | undefined {
  const url =
    imageLinks?.thumbnail ??
    imageLinks?.medium ??
    imageLinks?.large ??
    imageLinks?.extraLarge ??
    imageLinks?.smallThumbnail

  if (url) return ensureColorfulCoverUrl(url)

  if (volumeId) return buildStyledCoverUrl(volumeId)

  return undefined
}

export function ensureColorfulCoverUrl(url: string): string {
  let result = url.replace(/^http:/, 'https:')

  if (/books\.google/i.test(result)) {
    if (/zoom=\d+/i.test(result)) {
      result = result.replace(/zoom=\d+/i, 'zoom=1')
    } else {
      result += `${result.includes('?') ? '&' : '?'}zoom=1`
    }

    if (!/edge=curl/i.test(result)) {
      result += '&edge=curl'
    }
  }

  return result
}
