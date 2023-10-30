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

  const file = await s3.getObject('sitemap.xml');

  return consumers.buffer(file.body);
};

export default async function handler() {
  const emblem = await getObject('sitemap.xml');

  return new Response(emblem, {
    headers: { 'content-type': 'text/xml' }
  })
}
