// export const getRowsOfProduct = (productId) =>
//   new Promise((resolve, reject) => {
//     const sql = `
//       SELECT * FROM wp_postmeta
//       WHERE meta_value = 'lime'
//       `;
//       // WHERE post_id = ${productId} AND meta_key NOT IN ('_wp_attachment_metadata')
//     db.query(sql, (err, results) => {
//       err ? reject(err) : resolve(results);
//     });
//   });

// =============================
// ========== USEFUL ===========
// =============================
export const test01 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_posts WHERE post_parent = 2592`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const test02 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_postmeta WHERE post_id = 2592`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const test03 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_posts WHERE post_type = 'product' AND post_status = 'publish'`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const test04 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_posts WHERE ID = 5338 OR post_parent = 5338`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const test05 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_postmeta WHERE post_id = 5338`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

export const test06 = new Promise((resolve, reject) => {
  const sql = `SELECT * FROM wp_posts WHERE ID >= 5338`;

  db.query(sql, (err, results) => {
    err ? reject(err) : resolve(results);
  });
});

// =============================
// =============================
// =============================

// =============================
// =========== FINAL ===========
// =============================

// {
//   meta_id: 9271,
//   post_id: 127,
//   meta_key: '_product_image_gallery',
//   meta_value: '3842,3843,3841,3840,3839'
// }

// !! DO NOT DECLARE VARIABLES GLOBALLY AND KEEP USING THEM WHEN ATTEMTING MULTIPLE CALLS

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

// export const getAllProductsFinal = async () => {
//   let products = await getAllProducts;
//   products = products.map((product) => rowDataPacketToObj(product));

//   for (let product of products) {
//     const imagesUrls = await getImagesUrlsOfProductByProductId(product.ID);
//     product.imagesUrls = imagesUrls;
//   }

//   return products;
// };

export const getProductById = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT * FROM wp_posts WHERE ID = ${productId};`;
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

export const querySKUByProductId = (productId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT meta_value FROM wp_postmeta WHERE meta_key = '_sku' AND post_id = ${productId}
    `;

    db.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
