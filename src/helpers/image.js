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
  let cdnUrl;
  let url;
  try {
    cdnUrl = process.env.REACT_APP_IMAGE_CDN_URL || '';
  } catch (error) {
    cdnUrl = Deno.env.get('REACT_APP_IMAGE_CDN_URL') || '';
  }

  url = `${cdnUrl}${sourceUrl}`;

  if (cdnUrl !== '') {
    url = url.replace('https://upload.wikimedia.org/wikipedia/', '');

    if (width || height) {
      url = `${url}?w=${width || height}&h=${
        height || width
      }&func=fit&bg_color=fff`;
    }
  }

  return url;
};

export const generateUrl = (sourceUrl, large = false) => {
  const url = large
    ? generateLargeUrl(
        sourceUrl,
        window.innerWidth < window.innerHeight
          ? window.innerWidth
          : window.innerHeight
      )
    : sourceUrl;

  if (process.env.REACT_APP_IMAGE_CDN_URL) {
    return url.replace(
      'https://upload.wikimedia.org/wikipedia/',
      process.env.REACT_APP_IMAGE_CDN_URL
    );
  }

  return url;
};
