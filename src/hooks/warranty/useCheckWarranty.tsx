import useSWR from "swr";
import { WarrantyParams, WarrantyReceipt } from "@/types";
import {warrantyAPI} from "@/services";

interface Props {
	params: WarrantyParams;
	key: string;
}

interface WarrantyReceiptSWR {
	data: WarrantyReceipt[];
	error?: any;
	isValidating?: boolean;
}

const useCheckWarranty = ({ params, key }: Props): WarrantyReceiptSWR => {
	const { data, error, isValidating } = useSWR(
    key,
    () =>
      warrantyAPI
        .searchWarrantyReceipt(params)
        .then(
          (res: any) =>
            res?.result?.data?.warranty_receipt_customer || res?.data?.warranty_receipt_customer
        ),
    {
      revalidateOnFocus: false,
      dedupingInterval: 120000,
    }
  )

	return {
		data,
		error,
		isValidating,
	};
};

export { useCheckWarranty };
