import algoliasearch from 'algoliasearch';

export const searchInBbox = (bbox) => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );

  const index = searchClient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX);

  return index.search('', {
    insideBoundingBox: [bbox.flat()],
    hitsPerPage: 15,
  });
};
