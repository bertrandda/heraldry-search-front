# heraldry-search-front
Front French armorial, linked with [heraldry-crawler](https://github.com/bertrandda/heraldry-crawler) project.

_This project was originally generated with [create-instantsearch-app](https://github.com/algolia/create-instantsearch-app) by [Algolia](https://algolia.com)._

## Features
- 📖 Data from Wikipedia armorials [heraldry-crawler](https://github.com/bertrandda/heraldry-crawler)
  - 🏙 French cities
  - 🏘 French villages
  - 👨‍👩‍👧‍👦 French families
  - more are coming...
- 🔍 Simple and powerful search by [Algolia](https://algolia.com)

## Get started
Create `.env` file from `.env.sample` and complete it with the Algolia app settings in your [console](https://www.algolia.com/users/sign_inhttps://www.algolia.com/users/sign_in).

```sh
REACT_APP_SEARCH_SERVICE=     # Search service `algolia` OR `custom`
REACT_APP_ALGOLIA_APP_ID=     # Aloglia app ID
REACT_APP_ALGOLIA_API_KEY=    # Algolia API Key
REACT_APP_ALGOLIA_INDEX=      # Algolia index name
REACT_APP_CUSTOM_SEARCH_URL=  # if `custom` search service, heraldry-crawler server url
```

To run this project locally, install the dependencies and run the local server:

```sh
npm install
npm start
```

Alternatively, you may use [Yarn](https://http://yarnpkg.com/):

```sh
yarn
yarn start
```

Open http://localhost:3000 to see your app.
