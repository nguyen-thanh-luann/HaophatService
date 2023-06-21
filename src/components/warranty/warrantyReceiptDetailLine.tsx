import React from "react";

interface IWarrantyReceiptDetailLine {
	leftContent?: string;
	rightContent?: string;
}

export const WarrantyReceiptDetailLine = ({
	leftContent,
	rightContent,
}: IWarrantyReceiptDetailLine) => {
	return (
		<div className="flex gap-8 items-start mb-12 last:mb-0">
			<p className="title-sm">{leftContent}</p>
			<p className="flex-1 text-md">{rightContent}</p>
		</div>
	);
};
