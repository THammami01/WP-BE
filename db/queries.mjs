import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

import { rowDataPacketToObj, getMetaData } from "../utils.mjs";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

export const queryAllProducts = new Promise((resolve, reject) => {
  const sql = ` 
    SELECT ID, post_author, post_date_gmt as date,
      post_content as long_description, post_title as title,
      post_excerpt as short_description, comment_status as reviews_status,
      post_name as slug
    FROM wp_posts
    WHERE post_type = 'product' AND post_status = 'publish';
  `;
  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const queryProductByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = ` 
    SELECT ID, post_author, post_date_gmt as date,
      post_content as long_description, post_title as title,
      post_excerpt as short_description, comment_status as reviews_status,
      post_name as slug
    FROM wp_posts
    WHERE post_type = 'product' AND post_status = 'publish' AND ID = ${productId} 
  `;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryGalleryImgsIdsByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT meta_value FROM wp_postmeta
      WHERE post_id = ${productId} AND meta_key = "_product_image_gallery";
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryAllImgsUrlsByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT T2.ID as ID, T2.guid as guid FROM wp_posts as T1, wp_posts as T2
      WHERE T1.ID = ${productId} AND T1.ID = T2.post_parent AND T2.post_type = "attachment";
    `;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryReviewsByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT T1.user_id, T1.comment_author as name, T1.comment_author_email as email,
        T1.comment_date_gmt as date, T1.comment_content as content, T2.meta_value as vote
      FROM wp_comments as T1, wp_commentmeta as T2
      WHERE T1.comment_post_ID = ${productId}
        AND T1.comment_ID = T2.comment_id
        AND T2.meta_key = "rating";
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryReviewsByUserId = (userId) =>
  new Promise((resolve, reject) => {
    const sql = `
    SELECT T1.comment_author as name, T1.comment_author_email as email,
        T1.comment_date_gmt as date, T1.comment_content as content, T2.meta_value as vote
    FROM wp_comments as T1, wp_commentmeta as T2
    WHERE T1.comment_ID = T2.comment_id
      AND T1.user_id = ${userId}
      AND T2.meta_key = "rating";
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryVariationsByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT CONCAT("variation_id: ", T1.ID, ", ", T1.post_excerpt, ", SKU: ", T2.meta_value) as res 
      FROM wp_posts as T1, wp_postmeta as T2
      WHERE T1.post_parent = ${productId}
        AND T1.post_type = "product_variation"
        AND T1.ID = T2.post_id
        AND T2.meta_key = '_sku'
      ORDER BY T1.menu_order;
    `;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryTermsByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT taxonomy, name
      FROM wp_terms as T1, wp_term_relationships as T2, wp_term_taxonomy as T3
      WHERE T1.term_id = T3.term_id
        AND T2.term_taxonomy_id = T3.term_taxonomy_id
        AND object_id = ${productId}
      ORDER BY T3.taxonomy;
    `;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const queryMetaDataByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
    SELECT meta_key, meta_value FROM wp_postmeta
    WHERE post_id = ${productId}
    ORDER BY post_id, meta_key;
  `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const getAllProducts = async () => {
  let products = await queryAllProducts;
  products = products.map((product) => rowDataPacketToObj(product));

  for (let product of products) {
    let galleryImgsIds = await queryGalleryImgsIdsByProductId(product.ID);
    let allImgsUrls = await queryAllImgsUrlsByProductId(product.ID);
    let reviews = await queryReviewsByProductId(product.ID);
    let variations = await queryVariationsByProductId(product.ID);
    let terms = await queryTermsByProductId(product.ID);
    let meta_data = await queryMetaDataByProductId(product.ID);

    galleryImgsIds = galleryImgsIds[0].meta_value.split(",").map((v) => +v);
    allImgsUrls = allImgsUrls.map((img) => rowDataPacketToObj(img));

    product.gallery = allImgsUrls
      .filter(({ ID, guid }) => {
        if (!galleryImgsIds.includes(ID)) {
          product.main_image = guid;
          return false;
        }
        return true;
      })
      .map(({ guid }) => guid);

    product.reviews = reviews;

    variations = variations.map((v) =>
      v.res.split(", ").map((v) => v.split(": "))
    );

    for (let i = 0; i < variations.length; i++) {
      const obj = Object.fromEntries(variations[i]);
      obj.variation_id = parseInt(obj.variation_id);
      obj.meta_data = await queryMetaDataByProductId(obj.variation_id);

      obj.meta_data = getMetaData(obj.meta_data);
      variations[i] = obj;
    }

    product.variations = variations;

    terms = terms
      .map((v) => rowDataPacketToObj(v))
      .map(({ taxonomy, name }) => [taxonomy, name]);

    // product.vote = +terms
    //   .find((term) => term[0] === "product_visibility")[1]
    //   .substr(6);

    product.type = terms.find((term) => term[0] === "product_type")[1];

    product.colors = terms
      .filter((term) => term[0] === "pa_color")
      .map((term) => term[1]);

    product.sizes = terms
      .filter((term) => term[0] === "pa_size")
      .map((term) => term[1]);

    product.categories = terms
      .filter((term) => term[0] === "product_cat")
      .map((term) => term[1]);

    product.tags = terms
      .filter((term) => term[0] === "product_tag")
      .map((term) => term[1]);

    // product.SKU = SKU[0].meta_value;

    product.meta_data = getMetaData(meta_data);
  }

  return products;
};

export const getProductByProductId = async (productId) => {
  let product = await queryProductByProductId(productId);
  product = product.map((p) => rowDataPacketToObj(p))[0];

  if (product) {
    let galleryImgsIds = await queryGalleryImgsIdsByProductId(product.ID);
    let allImgsUrls = await queryAllImgsUrlsByProductId(product.ID);
    let reviews = await queryReviewsByProductId(product.ID);
    let variations = await queryVariationsByProductId(product.ID);
    let terms = await queryTermsByProductId(product.ID);
    let meta_data = await queryMetaDataByProductId(product.ID);

    galleryImgsIds = galleryImgsIds[0].meta_value.split(",").map((v) => +v);
    allImgsUrls = allImgsUrls.map((img) => rowDataPacketToObj(img));

    product.gallery = allImgsUrls
      .filter(({ ID, guid }) => {
        if (!galleryImgsIds.includes(ID)) {
          product.main_image = guid;
          return false;
        }
        return true;
      })
      .map(({ guid }) => guid);

    product.reviews = reviews;

    variations = variations.map((v) =>
      v.res.split(", ").map((v) => v.split(": "))
    );

    for (let i = 0; i < variations.length; i++) {
      const obj = Object.fromEntries(variations[i]);
      obj.variation_id = parseInt(obj.variation_id);
      obj.meta_data = await queryMetaDataByProductId(obj.variation_id);

      obj.meta_data = getMetaData(obj.meta_data);
      variations[i] = obj;
    }

    product.variations = variations;

    terms = terms
      .map((v) => rowDataPacketToObj(v))
      .map(({ taxonomy, name }) => [taxonomy, name]);

    product.type = terms.find((term) => term[0] === "product_type")[1];

    product.colors = terms
      .filter((term) => term[0] === "pa_color")
      .map((term) => term[1]);

    product.sizes = terms
      .filter((term) => term[0] === "pa_size")
      .map((term) => term[1]);

    product.categories = terms
      .filter((term) => term[0] === "product_cat")
      .map((term) => term[1]);

    product.tags = terms
      .filter((term) => term[0] === "product_tag")
      .map((term) => term[1]);

    product.meta_data = getMetaData(meta_data);
  }

  return product;
};

export const getUserByUserId = async (userId) => {
  let userReviews = await queryReviewsByUserId(userId);
  userReviews = userReviews.map((p) => rowDataPacketToObj(p));

  return userReviews;
};
