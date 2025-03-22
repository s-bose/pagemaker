import LZString from "lz-string";

const compress = (data: object) => {
  const jsonString = JSON.stringify(data);
  const compressed = LZString.compressToEncodedURIComponent(jsonString);
  return compressed;
};

const decompress = (encoded: string) => {
  const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
  try {
    return JSON.parse(decompressed);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { compress, decompress };
