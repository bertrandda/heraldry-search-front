import consumers from 'node:stream/consumers';

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

/**
 * Create wikipedia image url with custom width (keep original ratio).
 *
 * @param {string} sourceUrl - Image source.
 * @param {number} width - New width.
 * @returns
 */
const generateWikipediaImageUrl = (sourceUrl, width) => {
  if (!sourceUrl.match(/\/wikipedia\/commons\/thumb\//g)) {
    return sourceUrl
      .replace('/wikipedia/commons/', '/wikipedia/commons/thumb/')
      .concat(`/${width}px-`, sourceUrl.split('/').pop(), '.png');
  }

  return sourceUrl.replace(/g\/\d*px/g, `g/${width}px`);
};

/**
 * Create full image url by adding CDN & transformation on the fly (work with Cloudinary service).
 *
 * @param {string} sourceUrl - Original image url.
 * @param {number} width - New image width (add padding, do not change scale).
 * @param {number} height - New Image height (add padding, do not change scale).
 * @returns
 */
const generateUrl = (sourceUrl, width, height) => {
  let baseUrl = Deno.env.get('REACT_APP_CDN_URL')
    ? Deno.env.get('REACT_APP_CDN_URL')
    : '';
  if (width || height) {
    baseUrl = `${baseUrl}w_${width || height},h_${height || width},c_lpad/`;
  }

  return `${baseUrl}${sourceUrl}`;
};

export default async function handler(req, context) {
  console.log('Start SSR', req)
  const { pathname } = new URL(req.url);

  const response = await context.next();
  console.log('response', response)
  let htmlData = await response.text();
  console.log('htmlData', htmlData)

  try {
    const emblem = await getObject(`${pathname}.json`.replace(/^\//, ''));
    const emblemJson = JSON.parse(emblem.toString());
    htmlData = htmlData.replaceAll(
      'content="Armorial de France">',
      `content="Armorial de France - ${emblemJson.name}">`
    );
    htmlData = htmlData.replaceAll(
      '<meta property="og:url" content="https://armorial.bertranddaure.fr">',
      `<meta property="og:url" content="https://armorial.bertranddaure.fr${pathname}">`
    );
    htmlData = htmlData.replaceAll(
      '<meta property="og:image" content="/icon-og.png">',
      `<meta property="og:image" content="${generateUrl(
        generateWikipediaImageUrl(emblemJson.imageUrl, 512),
        1200,
        627
      )}">`
    );
    htmlData = htmlData.replaceAll(
      '<meta name="twitter:image" content="/icon-twitter.png">',
      `<meta name="twitter:image" content="${generateUrl(
        generateWikipediaImageUrl(emblemJson.imageUrl, 512),
        700,
        700
      )}">`
    );
    htmlData = htmlData.replace(
      '<script>window.__EMBLEM_DATA__=""</script>',
      `<script>window.__EMBLEM_DATA__ = ${emblem.toString()}</script>`
    );
  } catch (error) {
    console.log(`No emblem associated for path ${pathname}`);
    const url = new URL('/', req.url);

    return Response.redirect(url);
  }

  return new Response(htmlData, response);
}
