const generateOgUrl = (sourceUrl) => {
  if (
    !sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)
  ) {
    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(
        `/512px-`,
        sourceUrl.split('/').pop(),
        '.png'
      );
  }

  return sourceUrl.replace(
    /g\/\d*px/g,
    `g/${512}px`
  );
}

const generateUrl = (sourceUrl) =>
  `${process.env.REACT_APP_CDN_URL ? process.env.REACT_APP_CDN_URL : ''}${sourceUrl}`;


module.exports = { generateOgUrl, generateUrl }
