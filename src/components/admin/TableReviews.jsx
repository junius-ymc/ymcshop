// ✅ TableReviews.jsx
import React, { useEffect, useState } from 'react';
import { getReview, removeReview, toggleReviewEnabled } from '../../api/review';
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify';

const TableReviews = () => {
    const token = useEcomStore((state) => state.token);
    const user = useEcomStore((s) => s.user);
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortNewest, setSortNewest] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const res = await getReview(token);
            setReviews(res.data);
        } catch (err) {
            toast.error('โหลดข้อมูลรีวิวไม่สำเร็จ');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('คุณแน่ใจว่าต้องการลบรีวิวนี้?')) {
            try {
                await removeReview(token, id);
                toast.success('ลบรีวิวเรียบร้อย');
                loadReviews();
            } catch (err) {
                toast.error('ลบรีวิวไม่สำเร็จ');
            }
        }
    };

    const toggleSort = () => {
        setSortNewest((prev) => !prev);
    };

    const handleExportExcel = async () => {
        const XLSX = await import('xlsx');
        const dataToExport = filtered.map((r) => ({
            ชื่อ: r.userName,
            รีวิว: r.reviewProduct,
            OrderID: r.orderedId,
            วันที่: new Date(r.createdAt).toLocaleDateString(),
            เปิดใช้งาน: r.enabled ? '✔️(เปิด)' : '❌(ปิด)'
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reviews');
        // ตั้งชื่อไฟล์ Excel ตามวันที่
        const today = new Date();
        const dateStr = today.toLocaleDateString("th-TH").replaceAll("/", "-");
        XLSX.writeFile(workbook, `Reviews-${dateStr}.xlsx`);
    };

    const handleExportPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;
        const { registerTHFont } = await import('../../fonts/registerTHFont'); // ✅ นำเข้า font เมื่อกดปุ่ม handleExportPDF 

        const doc = new jsPDF();
        registerTHFont(doc);

        const tableData = filtered.map((r) => [
            r.userName,
            r.reviewProduct,
            r.orderedId,
            new Date(r.createdAt).toLocaleDateString(),
            r.enabled ? '✔️(เปิด)' : '❌(ปิด)'
        ]);

        doc.text('ตารางแสดงรีวิวสินค้าทั้งหมด', 16, 10);
        autoTable(doc, {
            head: [['ชื่อ', 'รีวิว', 'Order ID', 'วันที่', 'เปิดใช้งาน']],
            body: tableData,
            // startY: 20, // ระยะห่างจากหัวข้อ 'ตารางแสดงรีวิวสินค้าทั้งหมด'
            headStyles: {
                font: 'THSarabun',
                fontStyle: 'normal',  // ใช้รูปแบบตัวหนา normal
                fontSize: 16
            },
            styles: {
                font: 'THSarabun',
                fontSize: 14,
            },
        });
        // ตั้งชื่อไฟล์ PDF ตามวันที่
        const dateStr = new Date().toLocaleDateString("th-TH").replaceAll("/", "-");
        doc.save(`Reviews-${dateStr}.pdf`);
    };

    const toggleEnabled = async (id, current) => {
        try {
            const res = await toggleReviewEnabled(token, id, !current);
            setReviews(prev =>
                prev.map(r =>
                    r.id === id ? { ...r, enabled: res.data.enabled } : r
                )
            );
            toast.success('อัปเดตสถานะเรียบร้อย');
        } catch (err) {
            toast.error('อัปเดตสถานะไม่สำเร็จ');
        }
    };

    const filtered = reviews
        .filter((r) =>
            r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.reviewProduct.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortNewest ? dateB - dateA : dateA - dateB;
        });

    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <div className="p-1">
            <h1 className="text-2xl font-bold mb-4">จัดการรีวิวสินค้า</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="ค้นหาชื่อหรือรีวิว..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-md w-full md:w-1/3"
                />
                <div className="flex gap-2">
                    <button
                        onClick={toggleSort}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        เรียง: {sortNewest ? '🔻' : '🔺'}
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Export Excel
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">ชื่อ</th>
                            <th className="border px-3 py-2">รีวิว</th>
                            <th className="border px-3 py-2">Order ID</th>
                            <th className="border px-3 py-2">รูป</th>
                            <th className="border px-3 py-2">วันที่</th>
                            <th className="border px-3 py-2">สถานะ</th>
                            {user?.role === "admin" && (
                                <th className="border px-3 py-2">การจัดการ</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((r) => (
                            <tr key={r.id}>
                                <td className="border px-3 py-2">{r.userName}</td>
                                <td className="border px-3 py-2">{r.reviewProduct}</td>
                                <td className="border px-3 py-2  text-center">{r.orderedId}</td>
                                <td className="border px-3 py-2 text-center">
                                    <img src={r.url} alt="" className="w-16 h-16 object-cover inline-block" />
                                </td>
                                <td className="border px-3 py-2 text-center">{new Date(r.createdAt).toLocaleDateString()}</td>
                                <td className="border px-3 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={r.enabled}
                                        onChange={() => toggleEnabled(r.id, r.enabled)}
                                        className="w-5 h-5"
                                    />
                                </td>
                                {user?.role === "admin" && (
                                    <td className="border px-3 py-2 text-center text-xl font-bold">
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="text-red-600 hover:text-red-800 font-bold"
                                        >
                                            🗑 ลบ
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className="text-center mt-4 text-gray-500">ไม่มีข้อมูลรีวิวที่ตรงกับการค้นหา</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TableReviews;
