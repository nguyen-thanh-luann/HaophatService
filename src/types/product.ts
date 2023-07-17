import { AttributeMinor } from './attribute'
import { Category } from './category'
import { ImageId, URLRes } from './common'
import { Pagination, QueryList } from './http'
import { StarRatingRange, StarRatingRangeReq, StarString } from './rating'

//use in api v2
export interface ProductParams {
  type_get?: 'price_reduction' | 'price_increase' | 'new' | 'top_sale' | 'combo' | 'sale' | ''
  limit?: number
  offset?: number
  keyword?: string
  category_id?: number | false
  categ_id?: number | false
  product_id?: number
  partner_id?: number
  attribute_ids?: any[]
}

export interface GetProductDetailParams {
  product_id?: number
  product_code?: string
}

export interface CheckProductAuthenParams {
  uuid_code: string
}

export type ProductClassification = 'dietary_supplement' | 'medicine'

export type GetProductType = 'product_combo' | 'product_product'

export interface GetProductByAttributeMinorParams extends QueryList {
  attribute_id?: number
  attribute_value_ids?: number[]
}

export interface GetProductByCategoryParams extends QueryList {
  category_id?: number
  product_type?: GetProductType[]
}

export interface CompanyIdName {
  company_id: number
  company_name: string
}

export type ProductfilterSortType =
  | 'sold_quantity'
  | 'price_increase'
  | 'price_decrease'
  | 'new_product'
  | undefined

export interface FilterProductParams extends QueryList {
  product_type?: GetProductType
  category_ids?: number[] | []
  category_minor_ids?: number[] | []
  attributes?: any //list object update later
  attribute_id?: number
  attribute_value_ids?: number[] | []
  sort_by?: ProductfilterSortType
  price_min?: number | undefined
  price_max?: number | undefined
}

export interface ProductDetailRes {
  descendants_structor: Category[]
  product_data: ProductDetail
}

export interface Product {
  company_id: number
  product_id: number
  category_id: Category
  product_code: string
  barcode: string
  product_name: string
  representation_image: ImageId
  image_ids: ImageId[]
  price_unit: number
  origin_price_unit: number
  sold_quantity: number
  uom_id: ProductUom
  create_date: Date
  attribute_minor_ids: AttributeMinor[]
  rel_uom_ids: ProductUom[]
  packaging_specifications: string
  promotion_category: string
  attribute_ids: ProductAttribute[]
  rel_attribute_ids: ProductRelAttribute[]
  has_variant: boolean
  star_rating: StarRatingRange
  rating_count: number
  product_available: number
  quantity: number
  stock_quantity: ProductUom
  product_type: ProductClassification
  responsible_store_name: string
  responsible_store_street: string
}

export interface ProductUom {
  uom_id: number
  uom_name: string
  uom_full_standard_name?: string
  factor?: number
  quantity?: number
}

export interface AttributeId {
  attribute_id: number
  attribute_name: string
}

export interface ValueId {
  value_id: number
  value_name: string
}

export interface ProductAttribute {
  attribute: AttributeId
  attribute_value: ValueId
}

export interface ProductRelAttribute {
  attribute_id: AttributeId
  attribute_value: ValueId[]
}

export interface ListAttributeId {
  id: number
  lst_attributes_id: Array<number>
}

export interface ProductDetail extends Product {
  rel_product_ids: Product[]
  liked: boolean
  liked_count: number
  bridge_size: number
  lens_size: number
  temple_size: number
  frame_color_attribute: ProductDetailAtt
  frame_material_attribute: ProductDetailAtt
  lens_color_attribute: ProductDetailAtt
  lens_material_attribute: ProductDetailAtt
}

export interface ProductDetailAtt {
  value_icon: URLRes
  value_id: number
  value_name: string
}

export interface ProductDescriptionTab {
  content_id: number
  tab_id: number
  tab_name: string
  content: string
  extra_content: string
}

export interface ProductDescriptionChild extends ProductDescription {}

export interface ProductDescription {
  category_id: number
  category_name: string
  content: string
  extra_content: string
  tab: ProductDescriptionTab[]
  child: ProductDescriptionChild[]
}

export interface PurchasedProduct {
  history_line_id: number
  sale_order: {
    sale_id: number
    sale_name: string
  }
  product: PurchaseProduct
  comment_rating: CommentRating
}

export interface PurchaseProduct {
  product_tmpl_id: number
  product_id: number
  product_name: string
  qty_product: number
  price_unit: number
  amount_total: number
  image_url: Array<string>
}

export interface CommentRating {
  comment_id: number
  message: string | false
  star_rating: StarString
  star_rating_int: StarRatingRangeReq
  rating_tag: TagRating[]
  date: string
  partner_id: number
  partner_name: string
  partner_avatar: string
  content: string
  product_id: {
    id: number
    name: string
  }
  time_duration: {
    time_value: number
    time_type: TIME_TYPE
  }
  editable: boolean
  attachment_ids: {
    id: number
    file: string
    mimetype: 'image/jpeg' | 'image/png'
  }[]
  image_urls: {
    image_id: number
    image_url: string
  }[]
}

export interface TagRating {
  tag_id: number
  tag_content: string
}

export type TIME_TYPE = 'day' | 'second' | 'hour' | 'minute' | 'year' | 'month' | 'week'

export type ProductListRes = {
  descendants_structor: Category[]
  category_child: Category[]
  product_data: Product[]
  paginate: Pagination
}
