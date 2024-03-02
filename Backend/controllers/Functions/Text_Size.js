export const getSizeOfText = (text) => {
  const byteSize = Buffer.byteLength(text, "utf8");
  let sizeInBytes, sizeUnit;
  if (byteSize < 1024) {
    sizeInBytes = byteSize;
    sizeUnit = "bytes";
  } else if (byteSize < 1024 * 1024) {
    sizeInBytes = (byteSize / 1024).toFixed(2);
    sizeUnit = "KB";
  } else if (byteSize < 1024 * 1024 * 1024) {
    sizeInBytes = (byteSize / (1024 * 1024)).toFixed(2);
    sizeUnit = "MB";
  } else {
    sizeInBytes = (byteSize / (1024 * 1024 * 1024)).toFixed(2);
    sizeUnit = "GB";
  }

  return `${sizeInBytes} ${sizeUnit}`;
};
