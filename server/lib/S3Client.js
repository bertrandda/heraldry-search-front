const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3')
const consumers = require('node:stream/consumers')

const getObject = async (key) => {
  const s3 = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  })

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })

  const file = await s3.send(command)

  return consumers.buffer(file.Body)
}

module.exports = { getObject }
