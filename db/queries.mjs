import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

import { log, rowDataPacketToObj } from "../utils.mjs";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// !! DO NOT DECLARE VARIABLES GLOBALLY AND KEEP USE THEM WHEN ATTEMTING MULTIPLE CALLS

export const getTables = new Promise((resolve, reject) => {
  const sql = `SHOW TABLES;`;
  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const getTableRows = (tableName) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tableName}`;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const getTableRowsByCols = (tableName, colNames) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT ${colNames.join(", ")} FROM ${tableName}`;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

// {
//   meta_id: 9271,
//   post_id: 127,
//   meta_key: '_product_image_gallery',
//   meta_value: '3842,3843,3841,3840,3839'
// }

// =============================
// =========== FINAL ===========
// =============================

export const getImagesIdsOfProductByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT meta_value FROM wp_postmeta
      WHERE post_id = ${productId} AND meta_key = "_product_image_gallery";
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const getImagesUrlsOfProduct = (imagesIdsStr) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT guid FROM wp_posts
      WHERE ID IN (${imagesIdsStr})
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

// COMBINES THE ABOVE TWO FUNCTIONS
export const getImagesUrlsOfProductByProductId = async (productId) => {
  let res = await getImagesIdsOfProductByProductId(productId);
  res = await getImagesUrlsOfProduct(res[0].meta_value);
  return res.map((row) => row.guid);
};

export const getAllProducts = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_posts WHERE post_type = 'product';`;
  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const getAllProductsFinal = async () => {
  let products = await getAllProducts;
  products = products.map((product) => rowDataPacketToObj(product));

  for (let product of products) {
    const imagesUrls = await getImagesUrlsOfProductByProductId(product.ID);
    product.imagesUrls = imagesUrls;
  }

  return products;
};

export const getProductById = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT * FROM wp_posts WHERE post_type = 'product' AND ID = ${productId};`;
    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });

export const getProductByIdFinal = async (productId) => {
  let product = await getProductById(productId);
  product = product.map((p) => rowDataPacketToObj(p))[0];

  if (product) {
    const imagesUrls = await getImagesUrlsOfProductByProductId(product.ID);
    product.imagesUrls = imagesUrls;
  }

  return product;
};
