import React from 'react'

export const WarrantyReceiptDetailLoading = () => {
  return (
    <div className="animate-pulse rounded-md bg-white gap-8 mb-12">
      <div className="w-[250px] max-w-[90%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
      <div className="w-[200px] max-w-[90%] mb-12 h-[10px] rounded-md bg-gray-300"></div>

      <div className="flex gap-12">
        <div className="w-[90px] h-[90px] rounded-md bg-gray-300"></div>
        <div className="">
          <div className="w-[250px] max-w-[90%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
          <div className="w-[40%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
          <div className="w-[40%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
