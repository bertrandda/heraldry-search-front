const generateLargeUrl = (sourceUrl) =>
  sourceUrl.replace(
    /g\/\d*px/g,
    `g/${
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight
    }px`
  );

export const generateUrl = (sourceUrl, large = false) =>
  `${process.env.REACT_APP_CDN_URL ? process.env.REACT_APP_CDN_URL : ''}${
    large ? generateLargeUrl(sourceUrl) : sourceUrl
  }`;
