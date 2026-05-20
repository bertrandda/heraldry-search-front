export const generateLargeUrl = (sourceUrl, width, allowSvg = true) => {
  if (!allowSvg && !sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)) {
    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(`/${width}px-`, sourceUrl.split('/').pop(), '.png')
  }

  return sourceUrl.replace(/g\/\d*px/g, `g/${width}px`)
}

export const generateUrlWithPadding = (sourceUrl, width, height) => {
  let cdnUrl
  let url
  try {
    cdnUrl = import.meta.env.VITE_IMAGE_CDN_URL || ''
  }
  catch {
    // eslint-disable-next-line no-undef
    cdnUrl = Deno.env.get('VITE_IMAGE_CDN_URL') || ''
  }

  url = `${cdnUrl}${sourceUrl}`

  if (cdnUrl !== '') {
    url = url.replace('https://upload.wikimedia.org/wikipedia/', '')

    if (width || height) {
      url = `${url}?${cdnParams(cdnUrl, width, height)}`
    }
  }

  return url
}

export const generateUrl = (sourceUrl, large = false) => {
  const url = large
    ? generateLargeUrl(
        sourceUrl,
        window.innerWidth < window.innerHeight
          ? window.innerWidth
          : window.innerHeight,
      )
    : sourceUrl

  if (import.meta.env.VITE_IMAGE_CDN_URL) {
    return url.replace(
      'https://upload.wikimedia.org/wikipedia/',
      import.meta.env.VITE_IMAGE_CDN_URL,
    )
  }

  return url
}

const cdnParams = (cdnUrl, width, height) => {
  if (cdnUrl.includes('cloudimg.io')) {
    return `w=${width || height}&h=${height || width}&func=fit`
  }

  if (cdnUrl.includes('twic.pics')) {
    return `twic=v1/inside=${width || height}x${height || width}(10p)`
  }
}
