/**
 * Create wikipedia image url with custom width (keep original ratio)
 * @param {string} sourceUrl
 * @param {number} width
 * @returns
 */
const generateWikipediaImageUrl = (sourceUrl, width) => {
  if (
    !sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)
  ) {
    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(
        `/${width}px-`,
        sourceUrl.split('/').pop(),
        '.png'
      );
  }

  return sourceUrl.replace(
    /g\/\d*px/g,
    `g/${width}px`
  );
}

/**
 * Create full image url by adding CDN & transformation on the fly (work with Cloudinary service)
 * @param {string} sourceUrl - Original image url
 * @param {number} width - New image width (add padding, do not change scale)
 * @param {number} height - New Image height (add padding, do not change scale)
 * @returns
 */
const generateUrl = (sourceUrl, width, height) => {
  let baseUrl = process.env.REACT_APP_CDN_URL ? process.env.REACT_APP_CDN_URL : ''
  if (width || height) {
    baseUrl = `${baseUrl}w_${width || height},h_${height || width},c_lpad/`
  }

  return `${baseUrl}${sourceUrl}`;
}


module.exports = { generateWikipediaImageUrl, generateUrl }
