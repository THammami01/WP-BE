import * as _ from "./queries.mjs";
import { log, saveToJsonFile, rowDataPacketToObj } from "../utils.mjs";
import { getAllProducts } from "./queries.mjs";

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

    // res = await _.getTableRows("wp_postmeta");
    // log(res)

    // res = await _.getRowsOfProduct(1367);
    // res.forEach((r) => log(r));
    // log(res.length)

    // const res1 = await _.test01;
    // const res2 = await _.test02;
    // log(res1.length);
    // log(res2.length);

    // log("====================================================");

    // res1.forEach((r) => log(r));
    // for (let i = 0; i < 10; i++)
    //   log("====================================================");
    // res2.forEach((r) => log(r));

    // res = await _.test04;
    // log(res.length);
    // log(res);

    // res = await _.test05;
    // log(res.length);
    // log(res);

    // res = await _.getGalleryImgsIdsById(5338);
    // log(res);

    // res = await _.getAllImgsUrlsById(5338);
    // log(res);

    // res = await _.queryReviewsByProductId(5338);
    // log(res);

    // res = await _.queryVariationsByProductId(5338);
    // log(res);

    // res = await _.queryTermsByProductId(5338);
    // log(res);

    // res = await _.getAllProducts()
    // log(res)

    // let res1 = await _.getMetaValuesByProductId(5338);
    // let res2 = await _.getMetaValuesByProductId(5346);
    // let res3 = await _.getMetaValuesByProductId(5347);
    // let res4 = await _.getMetaValuesByProductId(5352);

    // res1 = Object.fromEntries(res1.map((v) => [v.meta_key, v.meta_value]));
    // log(res1)

    // res = "a:1:{i:0;i:2602;}";
    // // const index1 = res.indexOf("{");
    // // const index2 = res.lastIndexOf("}");
    // log(
    //   res.substring(5, res.length - 2)
    //   .split(";")
    //   .map((v) => +v.substring(2))
    // );

    res = await getAllProducts();
    Object.keys(res[1]).forEach(v => log(v));
  } catch (err) {
    log(err);
  }
})();
