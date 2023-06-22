import React from "react";
import { useQuery } from "@/hooks";
import { Lot, WarrantyParams } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../spinner";
import { warrantyAPI } from "@/services";
import { isArrayHasValue } from "@/helper";
import { DEFAULT_LIMIT } from "@/constants";
import { NotFound } from "../notFound";

interface ISelectProductWarranty {
	onClick?: Function;
	product_id?: number;
}

export const SelectLot = ({ onClick: onExternalClick, product_id = 0 }: ISelectProductWarranty) => {
	const {
		data: lotList,
		isValidating,
		fetchMore,
		hasMore,
	} = useQuery<Lot, WarrantyParams>({
		key: `get_product_lot_list`,
		fetcher: warrantyAPI.getListProductLot,
		initialParams: {
			limit: 12,
			product_id,
		},
		data_key: "lot",
	});

	const handleFetchMore = () => {
		fetchMore({ params: {} });
	};

	return (
    <div className="mt-12">
      <div className="max-h-[300px] overflow-scroll scrollbar-hide">
        {isValidating ? (
          <Spinner />
        ) : isArrayHasValue(lotList) ? (
          <div>
            <InfiniteScroll
              dataLength={lotList?.length || DEFAULT_LIMIT}
              next={handleFetchMore}
              hasMore={hasMore}
              loader={hasMore ? <Spinner /> : null}
            >
              {lotList?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onExternalClick?.(item)
                  }}
                  className="rounded-sm p-8 cursor-pointer border-1 
                  border-gray-200 mb-12 last:mb-0"
                >
                  <p className="text-md">{`Serial: ${(item as Lot)?.lot_name}`}</p>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <NotFound notify="Không tìm thấy thông tin" />
        )}
      </div>
    </div>
  )
};
