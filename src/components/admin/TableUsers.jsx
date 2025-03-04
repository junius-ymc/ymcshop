import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  // เรียงลำดับผลลัพท์จากใหม่ไปเก่า
  const sortedProducts = [...users].sort((a, b) => b.id - a.id);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => console.log(err));
  };

  // console.log(users);
  return (
    <div className="container mx-auto bg-white shadow-lg rounded-lg text-sm">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-3 border-b">ลำดับ</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Address</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">รูป</th>
            <th className="p-3 border-b">สิทธิ์</th>
            <th className="p-3 border-b">สถานะ</th>
            <th className="p-3 border-b">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts?.map((el, i) => {
            let nameData, addressData;
            try {
              nameData = JSON.parse(el.name || "{}");
              addressData = JSON.parse(el.address || "{}");
            } catch (error) {
              nameData = {};
              addressData = {};
            }

            return (
              <tr key={el.id} className="hover:bg-gray-50 border-b">
                <td className="p-3">{i + 1}:({el.id})</td>
                <td className="p-3">{`${nameData.fullName || "N/A"} ${nameData.phone || "N/A"}`}</td>
                <td className="p-3">
                  {`${addressData.houseNo || ""} ${addressData.district || ""} ${addressData.city || ""} ${addressData.province || ""} ${addressData.zipCode || ""}`.trim() || "N/A"}
                </td>
                <td className="p-3">{el.email}</td>
                <td className="p-3 text-center">
                  {el.picture ? <img src={el.picture} alt="User" className="w-10 h-10 rounded-full" /> : "N/A"}
                </td>
                <td className="p-3">
                  <select
                    onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                    value={el.role}
                    className="border rounded p-1"
                  >
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>
                <td className="p-3 font-semibold">
                  {el.enabled ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>}
                </td>
                <td className="p-3">
                  <button
                    className={`p-2 rounded-md text-white shadow-md ${el.enabled ? "bg-red-500" : "bg-green-500"}`}
                    onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                  >
                    {el.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
