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

const uploader = (file) => localFileUpload(file);

export default uploader;
