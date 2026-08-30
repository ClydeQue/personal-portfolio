export const portraitSampleKey = ({ width, height }) => `${width}:${height}`

export const shouldRefreshPortraitSample = (cachedKey, bounds) => cachedKey !== portraitSampleKey(bounds)
