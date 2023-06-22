
import { CreateWarrantyReceiptReq, WarrantyParams, WarrantyReceipt } from "@/types";
import { useAsync, useQuery } from "../common";
import { warrantyAPI } from "@/services";

interface Props {
	params?: WarrantyParams;
	key: string;
	data_key?: string;
}

interface WarrantyReceiptSWR {
  data: any
  // data: WarrantyReceipt[];
  error?: any
  isValidating?: boolean
  fetchMore: Function
  hasMore: boolean
  mutate: Function
  createWarrantyReceipt: Function
  confirmCreateWarrantyReceipt: Function
  deleteWarrantyReceiptDraft: Function
  updateCustomerWarrantyReceipt: Function
}

const useCustomerWarranty = ({ params, key, data_key }: Props): WarrantyReceiptSWR => {
	const { asyncHandler } = useAsync();

	const { data, isValidating, fetchMore, hasMore, mutate } = useQuery<
		WarrantyReceipt,
		WarrantyParams
	>({
		key,
		fetcher: warrantyAPI.getCustomerListWarrantyReceipt,
		initialParams: params,
		data_key,
	});

	const createWarrantyReceipt = async (
		params: CreateWarrantyReceiptReq,
		handleSuccess?: Function
	) => {
		asyncHandler<CreateWarrantyReceiptReq>({
			fetcher: warrantyAPI.createCustomerWarrantyReceipt(params),
			onSuccess: () => {
				handleSuccess?.();
			},
			config: {
				successMsg: "Tạo yêu cầu bảo hành thành công!",
			},
		});
	};

	const confirmCreateWarrantyReceipt = async (
		warranty_receipt_customer_id: number,
		handleSuccess?: Function
	) => {
		asyncHandler<WarrantyParams>({
			fetcher: warrantyAPI.customerConfirmCreateWarrantyReceipt({
				warranty_receipt_customer_id,
			}),
			onSuccess: (res) => {
				mutate(
          [...(data || [])].filter(
            (item) =>
              (item as WarrantyReceipt)?.warranty_receipt_customer_id !==
              res?.warranty_receipt_customer_id
          )
        )
				handleSuccess?.();
			},
			config: {
				successMsg: "Xác nhận bảo hành thành công!",
			},
		});
	};

	const deleteWarrantyReceiptDraft = async (
		warranty_receipt_customer_id: number,
		handleSuccess?: Function
	) => {
		asyncHandler<WarrantyParams>({
			fetcher: warrantyAPI.deleteCustomerWarrantyReceipt({
				warranty_receipt_customer_id,
			}),
			onSuccess: (res) => {
				mutate(
          [...(data || [])].filter(
            (item) =>
              (item as WarrantyReceipt)?.warranty_receipt_customer_id !==
              res?.warranty_receipt_customer_id
          )
        )
				handleSuccess?.();
			},
			config: {
				successMsg: "Xóa bảo hành thành công!",
			},
		});
	};

	const updateCustomerWarrantyReceipt = async (
		params: WarrantyParams,
		handleSuccess?: Function
	) => {
		asyncHandler<CreateWarrantyReceiptReq>({
			fetcher: warrantyAPI.updateCustomerWarrantyReceipt(params),
			onSuccess: () => {
				handleSuccess?.();
			},
			config: {
				successMsg: "Cập nhật thông tin bảo hành thành công!",
			},
		});
	};

	return {
		data,
		isValidating,
		fetchMore,
		hasMore,
		mutate,
		createWarrantyReceipt,
		confirmCreateWarrantyReceipt,
		deleteWarrantyReceiptDraft,
		updateCustomerWarrantyReceipt,
	};
};

export { useCustomerWarranty };
