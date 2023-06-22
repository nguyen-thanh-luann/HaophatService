export type WarrantyState = "confirm" | "waiting" | "cancel" | "draft";
export type TimeUnitValue = "months" | "days" | "weeks" | "years";

export interface WarrantyReceipt {
	name: string;
	warranty_receipt_customer_id: number;
	warranty_receipt_line_id: {
		warranty_receipt_id: number;
		warranty_receipt_line_id: number;
	};
	company_id: {
		company_id: number;
		company_name: string;
	};
	user_id: {
		user_id: number;
		user_name: string;
		avatar_url: Image_Url;
	};
	store_id: {
		partner_id: number;
		partner_name: string;
		phone: string;
		avatar_url: Image_Url;
	};
	customer_id: {
		partner_id: number;
		partner_name: string;
		phone: string;
		avatar_url: Image_Url;
	};
	lot_id: {
		lot_id: number;
		lot_name: string;
	};
	product_id: {
		product_id: number;
		product_code: string;
		product_name: string;
		representation_image: Image_Url;
	};
	warranty_duration_id: {
		name: string;
		factor: number;
		time_unit: {
			value: TimeUnitValue;
			description: {
				days: string;
				weeks: string;
				months: string;
				years: string;
			};
		};
	};
	warranty_starting: string;
	warranty_ending: string;
	state: WarrantyState;
}

export interface WarrantyReceiptDeatil extends WarrantyReceipt {
	invoice_ref?: string;
	country_id: {
		country_id: number;
		country_name: string;
	};
	province_id: {
		province_id: number;
		province_name: string;
	};
	district_id: {
		district_id: number;
		district_name: string;
	};
	ward_id: {
		ward_id: number;
		ward_name: string;
	};
	street: string;
	invoice_image_url: {
		image_id: number;
		image_url: string;
	};
}

export interface StoreWarrantyReceipt {
	warranty_receipt_id: number;
	invoice_ref: string;
	warranty_starting: string;
	company_id: {
		company_id: number;
		company_name: string;
	};
	user_id: {
		user_id: number;
		user_name: string;
		avatar_url: Image_Url;
	};
	name: string;
	store_id: {
		partner_id: number;
		partner_name: string;
		phone: string;
		avatar_url: Image_Url;
	};
	picking_id: {
		picking_id: number;
		name: string;
		amount_total: number;
		date_done: string;
		state: string;
	};
	state: WarrantyState;
}

export interface StoreWarrantyReceiptDetail extends StoreWarrantyReceipt {
	country_id: {
		country_id: number;
		country_name: string;
	};
	province_id: {
		province_id: number;
		province_name: string;
	};
	district_id: {
		district_id: number;
		district_name: string;
	};
	ward_id: {
		ward_id: number;
		ward_name: string;
	};
	street: string;
	warranty_receipt_lines: StoreWarrantyReceiptDetailItem[];
}

export interface StoreWarrantyReceiptDetailItem {
	warranty_receipt_id: number;
	warranty_receipt_line_id: number;
	lot_id: {
		lot_id: number;
		lot_name: string;
	};
	product_id: {
		product_id: number;
		product_code: string;
		product_name: string;
		representation_image: Image_Url;
	};
	product_code: string;
	product_uom: {
		uom_id: number;
		uom_name: string;
	};
	warranty_duration_id: {
		name: string;
		factor: number;
		time_unit: {
			value: TimeUnitValue;
			description: {
				days: string;
				weeks: string;
				months: string;
				years: string;
			};
		};
	};
	warranty_starting: string;
	warranty_ending: string;
	warranty_receipt_customer_id: number;
}

export interface WarrantyProductItem {
	product_id: number;
	product_code: string;
	product_name: string;
	representation_image: Image_Url;
}

export interface Image_Url {
	image_id: number;
	image_url: string;
}

export interface CustomerWarrantyState {
  state: string
  style: string
  title: string
}

export interface WarrantyStore {
	partner_id: number;
	partner_name: string;
	avatar_url: {
		image_id: number;
		image_url: string;
	};
	phone: string;
	email: string;
	address: string;
}

export interface WarrantyParams {
	type?: string;
	product_id?: number;
	product_name?: string;
	product_code?: string;
	lot_id?: number;
	lot_name?: string;
	customer_phone?: string;
	warranty_starting?: string;
	invoice_ref?: string;
	warranty_receipt_customer_id?: number;
	picking_id?: number;
	warranty_receipt_id?: number;
	customer_id?: number;
	store_id?: number;
	token?: string;
	store_phone?: string;
	invoice_code?: string;
	limit?: number;
	offset?: number;
	warranty_state?: string[];
}

export interface SearchWarrantyReceiptReq {
	lot_name?: string;
	customer_phone?: string;
}

export interface WarrantyProductDetailReq {
	token?: string;
	warranty_receipt_customer_id: number;
}

export interface CreateWarrantyReceiptReq {
	token: string;
	product_id: number;
	lot_id: number;
	warranty_starting: string;
	store_id?: number;
	customer_id?: number;
	picking_id?: number;
	invoice_ref?: string;
}

export interface GetListStoreReq {
	token?: string;
	province_id?: number;
	district_id?: number;
	ward_id?: number;
	limit?: number;
	offset?: number;
}

export interface Lot {
	lot_id: number;
	lot_name: string;
}

export interface Picking {
	picking_id: number;
	name: string;
	amount_total: number;
	date_done: string;
	state: string;
}


export interface WarrantyAttachment {
	attachment_id: number;
	attachment_url: string;
}

export interface CreateCustomerWarrantyReq {
	token?: string;
	customer_phone: string;
	customer_name: string;
}

export interface UpdateCustomerWarrantyReq extends CreateCustomerWarrantyReq {
	customer_id: number;
}

export interface CreateWarrantyAttachmentReq {
  token?: string
  attachments: {
    file: string
    type: 'image'
  }[]
}
