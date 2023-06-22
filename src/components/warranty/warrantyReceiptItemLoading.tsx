import React from 'react'

export const WarrantyReceiptItemLoading = () => {
  return (
    <div className="animate-pulse rounded-md bg-white flex gap-8 mb-12">
      <div className="rounded-md h-[60px] w-[60px] bg-gray-300"></div>
      <div className="">
        <div className="w-[200px] max-w-[90%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
        <div className="w-[30%] mb-12 h-[10px] rounded-md bg-gray-300"></div>
      </div>
    </div>
  )
}
