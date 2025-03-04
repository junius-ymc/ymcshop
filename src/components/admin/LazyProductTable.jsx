import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const LazyProductTable = ({ currentItems, indexOfFirstItem, toggleSortOrder, sortOrder, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="py-3 px-4 text-left text-gray-700 font-semibold cursor-pointer"
              onClick={toggleSortOrder}
            >
              No.{sortOrder === "DESC" ? "▼" : "▲"}
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">รูปภาพ</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">ชื่อสินค้า</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">รายละเอียด</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">ราคา</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">จำนวน</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">จำนวนที่ขายได้</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">วันที่อัปเดต</th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-200">
              <td className="text-xs py-3 px-4 text-gray-700">{indexOfFirstItem + index + 1}({item.id})</td>
              <td className="text-sm py-3 px-4">
                {item.images.length > 0 ? (
                  <img
                    className="w-16 h-16 rounded-lg shadow-md object-cover"
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                    No Image
                  </div>
                )}
              </td>
              <td className="text-sm py-3 px-4 text-gray-700">{item.title}</td>
              <td className="text-sm py-3 px-4 text-gray-700">{item.description}</td>
              <td className="text-sm py-3 px-4 text-gray-700">{numberFormat(item.price)}</td>
              <td className="text-sm py-3 px-4 text-gray-700">{item.quantity}</td>
              <td className="text-sm py-3 px-4 text-gray-700">{item.sold}</td>
              <td className="text-sm py-3 px-4 text-gray-700">{dateFormat(item.updatedAt)}</td>
              <td className="text-sm py-3 px-4 flex gap-2">
                <Link
                  to={"/admin/product/" + item.id}
                  className="p-2 bg-yellow-500 rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  <Pencil className="text-white" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                >
                  <Trash className="text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LazyProductTable;