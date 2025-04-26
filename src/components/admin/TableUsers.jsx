import React, { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";
import LoaderDiv from "../LoaderDiv";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const user = useEcomStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    setLoading(true); // เริ่มโหลด
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`error: ${err}`, {
          bodyClassName: "toastify-toast-modify",
        });
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    setLoading(true); // เริ่มโหลด
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
      .catch((err) => {
        console.log(err);
        toast.error(`error: ${err}`, {
          bodyClassName: "toastify-toast-modify",
        });
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  if (isLoading) return <p className="text-center"><br /><strong>... Loading ...</strong></p>;

  // console.log(users);
  // console.log(user)

  return (
    <div className="div-main-admin-content">
      {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
      <table className="admin-table-user">
        <thead className="admin-table-thead-user">
          <tr>
            <th className="admin-table-th-user">ลำดับ</th>
            <th className="admin-table-th-user">Name</th>
            <th className="admin-table-th-user">Address</th>
            <th className="admin-table-th-user">Email</th>
            {/* <th className="admin-table-th-user">รูป</th> */}
            <th className="admin-table-th-user">สิทธิ์</th>
            <th className="admin-table-th-user">สถานะ</th>
            <th className="admin-table-th-user">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedProducts
            .filter((el) => el.role !== "admin") // กรองเฉพาะ user / assistant / staff
            .map((el, i) => { */}
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
              <tr key={el.id} className="admin-table-tr-user text-xs">
                <td className="admin-table-td-user text-center">{i + 1}:({el.id})</td>
                <td className="admin-table-td-user">{`${nameData.fullName || "N/A"} ${nameData.phone || "N/A"}`}</td>
                <td className="admin-table-td-user">
                  {`${addressData.houseNo || ""} ${addressData.district || ""} ${addressData.city || ""} ${addressData.province || ""} ${addressData.zipCode || ""}`.trim() || "N/A"}
                </td>
                <td className="admin-table-td-user">{el.email}</td>
                {/* <td className="admin-table-td-user">
                  {el.picture ? <img src={el.picture} alt="User" className="w-10 h-10 rounded-full" /> : "N/A"}
                </td> */}
                <td className="admin-table-td-user text-center">
                  {user?.role === "admin" && el.role !== "admin" ? (
                    <select
                      onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                      value={el.role}
                      className="border rounded form-input-admin-style"
                    >
                      <option>user</option>
                      <option>staff</option>
                      <option>admin</option>
                    </select>
                  ) : (
                    <span>{el.role}</span> // แค่แสดงว่าเป็น admin ห้ามแก้
                  )}
                </td>
                <td className="admin-table-td-user text-center font-semibold">
                  {el.enabled ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>}
                </td>
                <td className="admin-table-td-user text-center flex items-center justify-center">
                  {el.role !== "admin" ? (
                    <button
                      className={`bttn btn-mod btn-admin-style text-xs ${el.enabled ? "bg-red-500" : "bg-green-500"}`}
                      onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                    >
                      {el.enabled ? "Disable" : "Enable"}
                    </button>
                  ) : (
                    <span>{el.role}</span> // แค่แสดงว่าเป็น admin ห้ามแก้
                  )}
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
