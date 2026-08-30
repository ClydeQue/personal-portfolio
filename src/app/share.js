export async function shareProject({ title, text, url }, navigatorLike = navigator) {
  try {
    if (navigatorLike.share) {
      await navigatorLike.share({ title, text, url })
      return 'Shared'
    }
    await navigatorLike.clipboard.writeText(url)
    return 'Link copied'
  } catch {
    try {
      await navigatorLike.clipboard.writeText(url)
      return 'Link copied'
    } catch {
      return `Share this URL: ${url}`
    }
  }
}
