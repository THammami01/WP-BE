import fs from "fs";

export const log = (...params) => console.log(...params);

export const saveToJsonFile = (obj, path_to_save) => {
  const str = JSON.stringify(obj);
  fs.writeFile(path_to_save, str, "utf8", (err) => {
    if (err) log(err);
    log("File Saved.");
  });
};

export const rowDataPacketToObj = (rowDataPacket) =>
  JSON.parse(JSON.stringify(rowDataPacket));
