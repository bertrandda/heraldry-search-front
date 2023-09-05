require('dotenv').config()
const fs = require('fs').promises;
const path = require('path');
const express = require('express');

const { getObject } = require('./lib/S3Client')
const { generateOgUrl, generateUrl } = require('./lib/image')

const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);
app.get('/*', async (req, res, next) => {
  let htmlData = await fs.readFile(indexPath, 'utf-8')

  try {
    const emblem = await getObject(`${req.path}.json`.replace(/^\//, ''))
    const emblemJson = JSON.parse(emblem.toString())
    htmlData = htmlData.replaceAll(
      'content="Armorial de France">',
      `content="${emblemJson.name}">`
    );
    htmlData = htmlData.replaceAll(
      'content="/icon-512.png">',
      `content="${generateUrl(generateOgUrl(emblemJson.imageUrl))}">`
    );
    htmlData = htmlData.replace(
      '<script>window.__EMBLEM_DATA__=""</script>',
      `<script>window.__EMBLEM_DATA__ = ${emblem.toString()}</script>`
    );
  } catch (error) {
    console.log(`No emblem associated for path ${req.path}`)
  }

  return res.send(htmlData);
});

app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error);
  }
  console.log(`listening on ${PORT}...`);
});
