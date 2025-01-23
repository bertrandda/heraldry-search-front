import { liteClient } from 'algoliasearch/lite';

export const searchInBbox = (bbox) => {
  const searchClient = liteClient(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_API_KEY
  );

  return searchClient.search({
    requests: [
      {
        indexName: process.env.REACT_APP_ALGOLIA_INDEX,
        insideBoundingBox: [bbox.flat()],
        hitsPerPage: 15,
      },
    ],
  });
};
