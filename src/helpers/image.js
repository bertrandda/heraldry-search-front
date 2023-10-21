/* eslint-disable no-undef */
export const generateLargeUrl = (sourceUrl, width, allowSvg = true) => {
  if (!allowSvg && !sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)) {
    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(`/${width}px-`, sourceUrl.split('/').pop(), '.png');
  }

  return sourceUrl.replace(/g\/\d*px/g, `g/${width}px`);
};

export const generateUrlWithPadding = (sourceUrl, width, height) => {
  let baseUrl;
  try {
    baseUrl = process.env.REACT_APP_CDN_URL || '';
  } catch (error) {
    baseUrl = Deno.env.get('REACT_APP_CDN_URL') || '';
  }

  if (width || height) {
    baseUrl = `${baseUrl}w_${width || height},h_${height || width},c_lpad/`;
  }

  return `${baseUrl}${sourceUrl}`;
};

export const generateUrl = (sourceUrl, large = false) =>
  `${process.env.REACT_APP_CDN_URL ? process.env.REACT_APP_CDN_URL : ''}${
    large
      ? generateLargeUrl(
          sourceUrl,
          window.innerWidth < window.innerHeight
            ? window.innerWidth
            : window.innerHeight
        )
      : sourceUrl
  }`;
