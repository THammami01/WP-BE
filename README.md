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

## Product Object Example

```json
{
  "ID": 127,
  "post_author": 1,
  "post_date": "2013-06-07T10:36:34.000Z",
  "post_date_gmt": "2013-06-07T10:36:34.000Z",
  "post_content": "Elementum hendrerit per a sed...",
  "post_title": "Dual Sim Unlocked",
  "post_excerpt": "Elementum hendrerit per a sed...",
  "post_status": "publish",
  "comment_status": "open",
  "ping_status": "closed",
  "post_password": "",
  "post_name": "dual-sim-unlocked",
  "to_ping": "",
  "pinged": "",
  "post_modified": "2021-08-31T15:32:00.000Z",
  "post_modified_gmt": "2021-08-31T15:32:00.000Z",
  "post_content_filtered": "",
  "post_parent": 0,
  "guid": "http://demo2.woothemes.com/woocommerce/?post_type=product&amp;p=93",
  "menu_order": 0,
  "post_type": "product",
  "post_mime_type": "",
  "comment_count": 1,
  "imagesUrls": [
    "http://localhost/wp-final/wp-content/uploads/2017/04/POD-S3.1-Shoes-10.jpg",
    "http://localhost/wp-final/wp-content/uploads/2017/04/POD-S3.1-Shoes-11.jpg",
    "http://localhost/wp-final/wp-content/uploads/2017/04/POD-S3.1-Shoes-12.jpg",
    "http://localhost/wp-final/wp-content/uploads/2017/04/POD-S3.1-Shoes-13.jpg",
    "http://localhost/wp-final/wp-content/uploads/2017/04/POD-S3.1-Shoes-14.jpg"
  ]
}
```

## Status Codes Ref

200: OK<br />
404: Not Found<br />
500: Internal Server Error
