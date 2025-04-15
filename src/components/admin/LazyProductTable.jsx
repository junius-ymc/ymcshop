import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const LazyProductTable = ({ currentItems, indexOfFirstItem, toggleSortOrder, sortOrder, handleDelete }) => {
  return (
    <div className="">
      <table className="admin-table-product">
        <thead className="admin-table-thead-product">
          <tr>
            <th
              className="admin-table-th-product font-semibold cursor-pointer"
              onClick={toggleSortOrder}
            >
              No.{sortOrder === "DESC" ? "▼" : "▲"}
            </th>
            <th className="admin-table-th-product">รูปภาพ</th>
            <th className="admin-table-th-product">ชื่อสินค้า</th>
            <th className="admin-table-th-product">รายละเอียด</th>
            <th className="admin-table-th-product">ราคา</th>
            <th className="admin-table-th-product">จำนวน</th>
            <th className="admin-table-th-product">จำนวนที่ขายได้</th>
            <th className="admin-table-th-product">วันที่อัปเดต</th>
            <th className="admin-table-th-product">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.map((item, index) => (
            <tr key={index} className="admin-table-tr-product">
              <td className="admin-table-td-product text-xs">{indexOfFirstItem + index + 1}({item.id})</td>
              <td className="admin-table-td-product">
                {item.images.length > 0 ? (
                  <img
                    className="w-16 h-20 rounded-md shadow-md"
                    src={item.images[0].url}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-16 h-20 bg-gray-200 rounded-md flex items-center justify-center shadow-sm">
                    No Image
                  </div>
                )}
              </td>
              <td className="admin-table-td-product text-xs">{item.title}</td>
              <td className="admin-table-td-product text-xs text-white-space">{item.description}</td>
              <td className="admin-table-td-product text-xs font-semibold">{numberFormat(item.price)}</td>
              <td className="admin-table-td-product text-xs">{item.quantity}</td>
              <td className="admin-table-td-product text-xs">{item.sold}</td>
              <td className="admin-table-td-product text-xs">{dateFormat(item.updatedAt)}</td>
              <td className="py-3 px-4 flex gap-2">
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