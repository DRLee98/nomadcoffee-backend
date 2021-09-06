import AWS from "aws-sdk";
import { createWriteStream } from "fs";

const makeFileName = (filename) =>
  `${Date.now()}-${Math.random() * 1000}-${filename}`;

const localFileUpload = async (file) => {
  if (file) {
    const { filename, createReadStream } = await file;
    const newFilename = makeFileName(filename);
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/files/" + newFilename,
    );
    readStream.pipe(writeStream);
    const PORT = process.env.PORT;
    return `http://localhost:${PORT}/static/${newFilename}`;
  } else {
    return null;
  }
};

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const awsUploader = async (file) => {
  if (file) {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const newFilename = makeFileName(filename);
    const { Location } = await new AWS.S3()
      .upload({
        Bucket: "nomad-coffee",
        Key: newFilename,
        ACL: "public-read",
        Body: readStream,
      })
      .promise();
    return Location;
  }
  return null;
};

const uploader = (file) => awsUploader(file);

const deleteFile = async (url) => {
  AWS.config.update({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_PRIVATE_KEY,
    },
  });
  try {
    if (url) {
      const Key = url.split(`nomad-coffee",.s3.amazonaws.com/`)[1];
      await new AWS.S3()
        .deleteObject(
          {
            Bucket: "nomad-coffee",
            Key,
          },
          (err, data) => {
            if (err) {
              throw err;
            }
            return { ok: true };
          },
        )
        .promise();
    }
  } catch (e) {
    console.log(e);
    return { ok: false, error: e };
  }
};

export default uploader;
