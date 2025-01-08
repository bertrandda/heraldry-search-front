import consumers from 'node:stream/consumers';
import { generateLargeUrl, generateUrlWithPadding } from '../../src/helpers/image.js'

import { S3Client } from 'https://deno.land/x/s3_lite_client@0.6.1/mod.ts';

const getObject = async (key) => {
  const s3 = new S3Client({
    region: Deno.env.get('S3_REGION'),
    endPoint: Deno.env.get('S3_ENDPOINT'),
    port: 443,
    useSSL: true,
    accessKey: Deno.env.get('S3_ACCESS_KEY_ID'),
    secretKey: Deno.env.get('S3_SECRET_ACCESS_KEY'),
    bucket: Deno.env.get('S3_BUCKET_NAME'),
  });

  const file = await s3.getObject(key);

  return consumers.buffer(file.body);
};

export default async function handler(req, context) {
  const { pathname } = new URL(req.url);

  const response = await context.next();
  let htmlData = await response.text();

  try {
    const emblem = await getObject(`${pathname}.json`.replace(/^\//, ''));
    const emblemJson = JSON.parse(emblem.toString());
    htmlData = htmlData.replaceAll(
      'content="Armorial de France"',
      `content="Armorial de France - ${emblemJson.name}"`
    );
    if (emblemJson.descriptionText) {
      htmlData = htmlData.replaceAll(
        /content="Trouvez[^"]+"/gm,
        `content="${emblemJson.descriptionText.split('\n')[0]}"`
      );
    }
    htmlData = htmlData.replaceAll(
      'content="https://armorialdefrance.org"',
      `content="https://armorialdefrance.org${pathname}"`
    );
    htmlData = htmlData.replaceAll(
      'href="https://armorialdefrance.org/"',
      `href="https://armorialdefrance.org${pathname}"`
    );
    htmlData = htmlData.replaceAll(
      'content="/icon-og.png"',
      `content="${generateUrlWithPadding(
        generateLargeUrl(emblemJson.imageUrl, 512, false),
        1200,
        627
      )}"`
    );
    htmlData = htmlData.replaceAll(
      'content="/icon-twitter.png"',
      `content="${generateUrlWithPadding(
        generateLargeUrl(emblemJson.imageUrl, 512, false),
        700,
        700
      )}"`
    );
    htmlData = htmlData.replace(
      '<script>window.__EMBLEM_DATA__=""</script>',
      `<script>window.__EMBLEM_DATA__ = ${emblem.toString()}</script>`
    );
  } catch (error) {
    console.log(error)
    console.log(`No emblem associated for path ${pathname}`);
    const url = new URL('/', req.url);

    return Response.redirect(url);
  }

  return new Response(htmlData, response);
}
