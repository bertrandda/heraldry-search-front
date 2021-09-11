export const generateUrl = (sourceUrl, large = false) => (
  `${process.env.REACT_APP_CDN_URL ? process.env.REACT_APP_CDN_URL : ''}${large ? generateLargeUrl(sourceUrl) : sourceUrl}`
)

const generateLargeUrl = (sourceUrl) => {
  if (navigator.userAgent.indexOf('Safari') > -1
    && navigator.userAgent.search(/Chrom(e|ium)/gm) === -1
    && !sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)) {

    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(
        `/${window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight}px-`,
        sourceUrl.split('/').pop(),
        '.png',
      )
  }

  return sourceUrl.replace(
    /g\/\d*px/g,
    `g/${window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight
    }px`
  )
}
