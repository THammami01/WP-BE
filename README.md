# API Notes

## Base URL

[http://localhost:4000/api](http://localhost:4000/api)

## Routes

- /products<br />
  Returns a list of all saved products<br />
  Status Codes: 200, 500
- /products/:productId<br />
  Returns a specific product<br />
  Status Codes: 200, 404, 500
- /users/:userId<br />
  Returns all user's reviews<br />
  Status Codes: 200, 500

## Status Codes Reference

200: OK<br />
404: Not Found<br />
500: Internal Server Error

## /api/products Results Example

```json
[
  { ... },
  { ... }
]
```

## /api/products/5338 Results Example

```json
{
  "ID": 5338,
  "post_author": 1,
  "date": "2021-09-01T12:46:47.000Z",
  "long_description": "The Nike <strong>Dunk</strong> Low Retro White Black released in January of 2021 and retailed for $100.",
  "title": "Jordan 12 Retro",
  "short_description": "...",
  "review_status": "open",
  "slug": "jordan-12-retro",
  "main_image": "http://localhost/wp-final/wp-content/uploads/2021/09/img01.webp",
  "gallery": [
    "http://localhost/wp-final/wp-content/uploads/2021/09/img24.jpg",
    "http://localhost/wp-final/wp-content/uploads/2021/09/img14.jpg",
    "http://localhost/wp-final/wp-content/uploads/2021/09/img07.jpg"
  ],
  "reviews": [
    {
      "user_id": 1,
      "name": "admin",
      "email": "bixono9493@mi166.com",
      "date": "2021-09-01T13:17:16.000Z",
      "content": "sabat ..",
      "vote": "4"
    },
    {
      "user_id": 1,
      "name": "admin",
      "email": "bixono9493@mi166.com",
      "date": "2021-09-02T05:58:26.000Z",
      "content": "my review...",
      "vote": "3"
    }
  ],
  "variations": [
    {
      "variation_id": 5346,
      "color": "black",
      "size": "40",
      "SKU": "00000001",
      "meta_data": {
        "_backorders": "no",
        "_download_expiry": "-1",
        "_download_limit": "-1",
        "_downloadable": "no",
        "_manage_stock": "yes",
        "_product_version": "5.6.0",
        "_regular_price": "270",
        "_sku": "00000001",
        "_sold_individually": "no",
        "_stock": "3",
        "_stock_status": "instock",
        "_tax_class": "parent",
        "_tax_status": "taxable",
        "_thumbnail_id": "0",
        "_variation_description": "",
        "_virtual": "no",
        "_wc_average_rating": "0",
        "_wc_review_count": "0",
        "attribute_pa_color": "black",
        "attribute_pa_size": "40",
        "total_sales": "0"
      }
    },
    {
      "variation_id": 5347,
      "color": "black",
      "size": "41",
      "SKU": "00000002",
      "meta_data": {
        "_backorders": "no",
        "_download_expiry": "-1",
        "_download_limit": "-1",
        "_downloadable": "no",
        "_manage_stock": "yes",
        "_product_version": "5.6.0",
        "_regular_price": "250",
        "_sale_price": "200",
        "_sale_price_dates_from": "1631232000",
        "_sale_price_dates_to": "1635724799",
        "_sku": "00000002",
        "_sold_individually": "no",
        "_stock": "10",
        "_stock_status": "instock",
        "_tax_class": "parent",
        "_tax_status": "taxable",
        "_thumbnail_id": "0",
        "_variation_description": "",
        "_virtual": "no",
        "_wc_average_rating": "0",
        "_wc_review_count": "0",
        "attribute_pa_color": "black",
        "attribute_pa_size": "41",
        "total_sales": "0"
      }
    },
    {
      "variation_id": 5352,
      "color": "green",
      "size": "40",
      "SKU": "00000003",
      "meta_data": {
        "_backorders": "no",
        "_download_expiry": "-1",
        "_download_limit": "-1",
        "_downloadable": "no",
        "_manage_stock": "yes",
        "_product_version": "5.6.0",
        "_regular_price": "260",
        "_sku": "00000003",
        "_sold_individually": "no",
        "_stock": "0",
        "_stock_status": "outofstock",
        "_tax_class": "parent",
        "_tax_status": "taxable",
        "_thumbnail_id": "0",
        "_variation_description": "",
        "_virtual": "no",
        "_wc_average_rating": "0",
        "_wc_review_count": "0",
        "attribute_pa_color": "green",
        "attribute_pa_size": "40",
        "total_sales": "0"
      }
    }
  ],
  "type": "variable",
  "colors": ["green", "black"],
  "sizes": ["40", "41"],
  "categories": ["Shoes", "Air Jordan"],
  "tags": ["fashion", "men"],
  "meta_data": {
    "_backorders": "no",
    "_crosssell_ids": [2602],
    "_download_expiry": "-1",
    "_download_limit": "-1",
    "_downloadable": "no",
    "_edit_last": "1",
    "_edit_lock": "1630684060:1",
    "_manage_stock": "yes",
    "_product_attributes": "a:2:{s:8:\"pa_color\";a:6:{s:4:\"name\";s:8:\"pa_color\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:0;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:1;}s:7:\"pa_size\";a:6:{s:4:\"name\";s:7:\"pa_size\";s:5:\"value\";s:0:\"\";s:8:\"position\";i:2;s:10:\"is_visible\";i:1;s:12:\"is_variation\";i:1;s:11:\"is_taxonomy\";i:1;}}",
    "_product_image_gallery": "5342,5341,5340",
    "_product_version": "5.6.0",
    "_sku": "00000000",
    "_sold_individually": "yes",
    "_stock": "1",
    "_stock_status": "instock",
    "_tax_class": "",
    "_tax_status": "taxable",
    "_thumbnail_id": "5339",
    "_upsell_ids": [2602],
    "_virtual": "no",
    "_wc_average_rating": "3.50",
    "_wc_rating_count": "a:2:{i:3;i:1;i:4;i:1;}",
    "_wc_review_count": "2",
    "_wp_page_template": "default",
    "rs_page_bg_color": "",
    "total_sales": "0"
  }
}
```

## /api/users/1 Results Example

```json
[
  {
    "name": "admin",
    "email": "bixono9493@mi166.com",
    "date": "2021-09-01T13:17:16.000Z",
    "content": "sabat ..",
    "vote": "4"
  },
  {
    "name": "admin",
    "email": "bixono9493@mi166.com",
    "date": "2021-09-02T05:58:26.000Z",
    "content": "my review...",
    "vote": "3"
  }
]
```
