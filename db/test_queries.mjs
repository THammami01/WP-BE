import * as _ from "./queries.mjs";
import { log, saveToJsonFile, rowDataPacketToObj } from "../utils.mjs";


(async () => {
  try {
    let res;

    // // ALL TABLES IN DB
    // res = await _.getTables;
    // log(res.map((cols) => cols["Tables_in_wp-final"]));

    // // ALL wp_posts TABLE ROWS
    // res = await _.getTableRows("wp_posts");
    // log(res)

    // // ALL 25 PRODUCTS DETAILS
    // res = await _.getTableRows("wp_posts");
    // log(
    //   res
    //     .filter((row) => row.post_type === "product")
    //     // .length
    // );

    // // ALL 25 PRODUCTS IDS
    // res = await _.getTableRowsByCols("wp_posts", ["post_type", "ID"]);
    // res
    //   .filter((row) => row.post_type === "product")
    //   .map((row) => row.ID)
    //   .forEach((id) => {
    //     log(id);
    //   });

    // // ALL 25 PRODUCTS TITLES
    // res = await _.getTableRows("wp_posts");
    // res
    //   .filter((row) => row.post_type === "product")
    //   .map((row) => row.post_title)
    //   .reverse()
    //   .forEach((title) => {
    //     log(title);
    //   });

    // res = await _.getTableRows("wp_posts");
    // res
    //   .filter((row) => row.post_type === "attachment")
    //   .map((row) => Object.entries(row));

    // // SAVE wp_posts TO JSON FILE
    // res = await _.getTableRows("wp_posts");
    // log(res);
    // saveToJsonFile(res, "./wp_posts.json");

    // // SAVE wp_postmeta TO JSON FILE
    // res = await _.getTableRows("wp_postmeta");
    // log(res);
    // saveToJsonFile(res, "./wp_postmeta.json");

    // res = await _.getTableRows("wp_postmeta");
    // log(res.filter((row) => row.post_id === 127));

    // res = await _.getTableRows("wp_postmeta");
    // log(res.filter((row) => row.meta_id === 3842));

    // // GET GALLERY OF A PRODUCT BY ID
    // res = await _.getImagesIdsOfProductByProductId(2602);
    // // returns 3 arrays that differs only on pk
    // const imagesIdsStr = res[0].meta_value;
    // res = await _.getImagesUrlsOfProduct(imagesIdsStr);
    // log(res.map((row) => row.guid));

    // res = await _.getAllProducts;
    // log(res.map((product) => rowDataPacketToObj(product)));
  } catch (err) {
    log(err);
  }
})();
