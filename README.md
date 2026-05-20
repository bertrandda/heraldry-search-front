# heraldry-search-front

A web app to search French armorial data (cities, villages, families), powered by [heraldry-crawler](https://github.com/bertrandda/heraldry-crawler) and [Algolia](https://algolia.com).

## Features
- 📖 Data from Wikipedia armorials [heraldry-crawler](https://github.com/bertrandda/heraldry-crawler)
  - 🏙 French cities
  - 🏘 French villages
  - 👨‍👩‍👧‍👦 French families
  - more are coming...
- 🔍 Simple and powerful search by [Algolia](https://algolia.com)

## Get started

1. Create `.env` file from `.env.sample` and complete it with the Algolia app settings in your [console](https://www.algolia.com/users/sign_in).

```sh
VITE_SEARCH_SERVICE=     # Search service `algolia` OR `custom`
VITE_ALGOLIA_APP_ID=     # Aloglia app ID
VITE_ALGOLIA_API_KEY=    # Algolia API Key
VITE_ALGOLIA_INDEX=      # Algolia index name
VITE_CUSTOM_SEARCH_URL=  # if `custom` search service, heraldry-crawler server url
```

2. Install dependencies and start the app:

```sh
npm install
npm start
# or
yarn
yarn start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Contributing

Pull requests are welcome!

## License

[MIT](LICENSE)
