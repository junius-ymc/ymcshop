// import axios from "axios";
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { getContact, removeContact } from "../../api/contact";
import { toast } from 'react-toastify'
import LoaderDiv from "../LoaderDiv";

const TableContact = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const token = useEcomStore((state) => state.token);

    const handleRemove = async (id) => {
        const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?");
        if (!isConfirmed) return; // ❌ ยกเลิกถ้าไม่กดยืนยัน
        setLoading(true); // เริ่มโหลด
        try {
            const res = await removeContact(token, id);
            console.log(res);
            toast.success(`Deleted ID: ${res.data.id} success`);
            // fetchContacts(); // ✅ เรียกจากหลังบ้าน โหลดใหม่ทั้งหมดหลังลบ
            setContacts(prev => prev.filter(c => c.id !== id)); // ✅ อัปเดต state
        } catch (err) {
            console.log(err);
            toast.error(`${err}`, { bodyClassName: "toastify-toast-modify" });
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async () => {
        try {
            // const res = await axios.get("http://localhost:5001/api/contact");
            const res = await getContact(token);
            setContacts(res.data);
        } catch (err) {
            console.error("❌ Error fetching contacts:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (isLoading) return <p className="text-center"><br /><strong>... Loading ...</strong></p>;

    return (
        <div className="div-main-admin-content">
            <table className="admin-table-orders">
                <thead className="admin-table-thead-orders">
                    <tr>
                        <th className="admin-table-th-orders">#</th>
                        <th className="admin-table-th-orders">Name</th>
                        <th className="admin-table-th-orders">Email</th>
                        <th className="admin-table-th-orders">Subject</th>
                        <th className="admin-table-th-orders">Message</th>
                        <th className="admin-table-th-orders">Date</th>
                        <th className="admin-table-th-orders">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c, index) => (
                        <tr key={c.id} className="admin-table-tr-orders text-xs">
                            <td className="admin-table-td-orders">{index + 1}</td>
                            <td className="admin-table-td-orders">{c.name}</td>
                            <td className="admin-table-td-orders">{c.email}</td>
                            <td className="admin-table-td-orders">{c.subject}</td>
                            <td className="admin-table-td-orders text-white-space">{c.message}</td>
                            <td className="admin-table-td-orders">{new Date(c.createdAt).toLocaleString()}</td>
                            <td className="admin-table-td-orders">
                                <button
                                    className='bttn btn-mod-1 btn-admin-style text-xs'
                                    onClick={() => handleRemove(c.id)}
                                >
                                    Delete
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
        </div>
    );
};

export default TableContact;
