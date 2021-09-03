# Notes

## App

- Pages:
  Home
  Home / [Category] / [Product]
  Wish List
  Cart

## Fetching Data

- EACH PRODUCT OBJECT:
  id
  title
  date
  vote_average
  short_description
  long_description
  main_image
  gallery: [url]
  reviews: [{user_id, name, image, vote, date, content}]
  variations: [{color, size, regular_price, sale_price, sale_start_date, sale_end_date, stock_qty}]
  categories: [category]
  tags: [tag]
  SKU
  permalink
  related_products: [id]

[!Slugs are to be used in URLs]
[!Slugs must be Dash Separated Lowercase Strings]
[!Product data must be 'Variable product']

- Categories:
  Name: Nike, Adidas, Air Jordan, ..
  Description
  Image
  Featured: Y/N
  [!'Display type' must be 'Products']

- Tags:
  Name: Fashion, Men, Women, ..
  Description
  Count: 0, 1, 15, ..

- Attributes:
  Name: Color
  Slug: color
  Terms: [!Terms must be Comma Separated String]
  eg. size: 39, 40, 41 | color: red, blue, gray

## POSTMETA Table Available Meta Keys

```plain
All:  _backorders _download_expiry _download_limit _downloadable _manage_stock
      _manage_stock _price _product_version _sku _sold_individually total_sales _stock
      _stock_status _tax_class _tax_status _thumbnail_id _wc_average_rating
      _wc_review_count _wp_page_template rs_page_bg_color

Only 1:       _edit_last
              _edit_lock
              _price
              _price
              _product_attributes
              _product_image_gallery
              _virtual
              _wc_rating_count

Only 2, 3, 4: _regular_price
              _variation_description
              _virtual
              attribute_pa_color
              attribute_pa_size

+ Only 2:     _sale_price
              _sale_price_dates_from
              _sale_price_dates_to
```

## Get Gravatar Image

[https://www.gravatar.com/avatar/EMAIL_HASH]

## More

- MVP: Minimum Viable Product
Settings > Permalinks > Product Permalinks:
Select: Default [http://localhost/wp-final/product/sample-product/]

- Permalink:
[localhost/wp-final/product/<slug>]

- Linked Products:
in meta_data: '_upsell_ids', '_crosssell_ids'
format: a:1:{i:0;i:2602;}
