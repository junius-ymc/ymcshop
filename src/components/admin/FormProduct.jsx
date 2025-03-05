import React, { useEffect, useState, Suspense } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: 0,
  categoryId: "",
  images: [],
};

// Lazy load component สำหรับแสดงตารางสินค้า
const LazyProductTable = React.lazy(() => import("./LazyProductTable"));

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1); // State สำหรับหน้าที่กำลังแสดง
  const itemsPerPage = 5; // จำนวนสินค้าต่อหน้า
  const [sortOrder, setSortOrder] = useState("DESC"); // State สำหรับเก็บสถานะการเรียงลำดับ

  useEffect(() => {
    getCategory();
    getProduct(100); // โหลดข้อมูลสินค้าครั้งแรก
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      setForm(initialState); // ✅ รีเซ็ตค่า form หลังจากบันทึกสำเร็จ
      getProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // คำนวณสินค้าที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // เรียงลำดับสินค้าตาม id
  const sortedProducts = [...products].sort((a, b) => {
    return sortOrder === "DESC" ? b.id - a.id : a.id - b.id;
  });

  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // เปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // เปลี่ยนสถานะการเรียงลำดับ
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "DESC" ? "ASC" : "DESC");
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">

      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">เพิ่มข้อมูลสินค้า</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={handleOnChange}
            placeholder="Description"
            name="description"
            rows="4"
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
            onChange={handleOnChange}
            placeholder="Price"
            name="price"
          />
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="Quantity"
            title="Quantity"
            name="quantity"
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              Please Select
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Uploadfile form={form} setForm={setForm} />

        <button
          className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          type="submit"
        >
          เพิ่มสินค้า
        </button>
      </form>

      <hr className="my-6 border-gray-300" />

      {/* Pagination */}
      <div className="flex justify-center mb-6">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-2 py-1 rounded-sm ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Lazy load ตารางสินค้า */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyProductTable
          currentItems={currentItems}
          indexOfFirstItem={indexOfFirstItem}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
          handleDelete={handleDelete}
        />
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-2 py-1 rounded-sm ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default FormProduct;