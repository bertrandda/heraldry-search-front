import { liteClient } from 'algoliasearch/lite'

export const searchInBbox = (bbox) => {
  const searchClient = liteClient(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_API_KEY,
  )

  return searchClient.search({
    requests: [
      {
        indexName: import.meta.env.VITE_ALGOLIA_INDEX,
        insideBoundingBox: [bbox.flat()],
        hitsPerPage: 15,
      },
    ],
  })
}
