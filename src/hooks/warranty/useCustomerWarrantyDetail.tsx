import useSWR from "swr";
import { warrantyAPI } from "@/services";
import {WarrantyProductDetailReq} from "@/types";

interface Props {
	params: WarrantyProductDetailReq;
	key: string;
}

interface IUseStoreWarrantyDetail {
  data: any
  mutate?: any
  isValidating?: boolean
}

const useCustomerWarrantyDetail = ({ params, key }: Props): IUseStoreWarrantyDetail => {
	const { data, mutate, isValidating } = useSWR(
    key,
    () =>
      warrantyAPI
        .getWarrantyProductDetail(params)
        .then(
          (res: any) =>
            res?.result?.data?.warranty_receipt_customer?.[0] ||
            res?.data?.warranty_receipt_customer?.[0]
        ),
    {
      revalidateOnFocus: false,
    }
  )

	return {
		data,
		mutate,
		isValidating,
	};
};

export { useCustomerWarrantyDetail };
