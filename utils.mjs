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

export const getMetaData = (meta_data) =>
  Object.fromEntries(
    meta_data
      .filter((v) => v.meta_key !== "_price")
      .map((v) => {
        if (v.meta_key === "_upsell_ids" || v.meta_key === "_crosssell_ids") {
          v.meta_value = v.meta_value
            .substring(5, v.meta_value.length - 2)
            .split(";")
            .map((v) => +v.substring(2))
            .slice(1);
        }

        return [v.meta_key, v.meta_value];
      })
  );
