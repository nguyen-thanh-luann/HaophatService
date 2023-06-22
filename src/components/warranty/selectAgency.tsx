import React from "react";
import { useForm } from "react-hook-form";
import { useAddress, useAgency } from "@/hooks";
import { OptionType } from "@/types";
import { Button} from "../button";
import { SelectField } from "../inputs";

interface ISelectProductWarranty {
	onClick?: Function;
}

export const SelectAgency = ({ onClick: onExternalClick }: ISelectProductWarranty) => {
	const {
		control,
		getValues,
		resetField,
	} = useForm({
		mode: "all",
	});

	const { districts, getDistricts, getWards, states, wards } = useAddress();
	const { data: stores, searchStore } = useAgency({ key: `get_store`, params: {} });

	// tỉnh
	const handleSelectState = (val: OptionType<number>) => {
		getDistricts(val.value);
		searchStore({ province_id: val.value });

		if (getValues("district") || getValues("ward")) {
			resetField("district");
			resetField("ward");
		}
	};

	// huyện
	const handleSelectDistrict = (district: OptionType<number>) => {
		getWards(district.value);
		searchStore({ province_id: getValues("state").value, district_id: district?.value });
	};

	return (
    <div className="mt-12">
      <div className="max-h-[400px] overflow-scroll scrollbar-hide">
        <div className="mb-12">
          <SelectField
            label="Tỉnh / Thành Phố"
            control={control}
            onChange={(val: any) => {
              handleSelectState(val)
            }}
            placeholder="Tỉnh thành phố"
            name="state"
            options={states?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>

        <div className="mb-12">
          <SelectField
            label="Quận / Huyện"
            value={getValues('district') || null}
            control={control}
            onChange={(val: any) => {
              handleSelectDistrict(val)
              if (getValues('ward')) resetField('ward')
            }}
            placeholder={'Quận / Huyện'}
            name="district"
            options={districts?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>

        <div className="mb-12">
          <SelectField
            label="Phường/xã"
            value={getValues('ward') || null}
            control={control}
            onChange={(val: any) => {
              searchStore({
                province_id: getValues('state')?.value,
                district_id: getValues('district')?.value,
                ward_id: val?.value,
              })
            }}
            placeholder="Phường / Xã"
            name="ward"
            options={wards?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>

        <div className="mb-12">
          <SelectField
            label="Đại lý"
            name="agency"
            control={control}
            required={true}
            placeholder="Chọn đại lý"
            options={stores?.map((item) => ({
              label: item.partner_name,
              value: item.partner_id,
            }))}
          />
        </div>

        <Button
          title="Xác nhận"
          className={`w-full bg-primary p-8`}
          textClassName="text-white"
          onClick={() => {
            onExternalClick?.(getValues('agency'))
          }}
        />
      </div>
    </div>
  )
};
