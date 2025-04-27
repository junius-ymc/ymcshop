import React, { useEffect, useState, Suspense } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
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
  const user = useEcomStore((s) => s.user);

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

  // console.log(form)

  return (
    <div className="div-main-admin-content">
      {user?.role === "admin" && (
        <div className='admin-div-product'>
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">เพิ่มข้อมูลสินค้า</h1>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-1"> */}
            <div className="gap-1">
              <div className="setdiv-1">
                <div className="setdiv-2">

                  <div className="admin-div-product-1">
                    <input
                      className="form-input form-input-product-admin-style"
                      value={form.title}
                      onChange={handleOnChange}
                      placeholder="Title"
                      title="ชื่อสินค้า"
                      name="title"
                      required
                    />

                    <input
                      className="form-input form-input-product-admin-style"
                      value={form.price}
                      onChange={handleOnChange}
                      placeholder="Price"
                      title="ราคา"
                      name="price"
                      required
                    />
                    <input
                      type="number"
                      className="form-input form-input-product-admin-style"
                      value={form.quantity}
                      onChange={handleOnChange}
                      placeholder="Quantity"
                      title="จำนวน"
                      name="quantity"
                      required
                    />
                    <select
                      className="form-input form-input-product-admin-style"
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
                  <div className="admin-div-product-2">
                    <textarea
                      className="form-input form-textarea-product-admin-style"
                      value={form.description}
                      onChange={handleOnChange}
                      placeholder="Description"
                      title="รายละเอียด/ข้อมูลสินค้า"
                      name="description"
                      rows="4"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <Uploadfile form={form} setForm={setForm} />

            <button
              className="bttn btn-mod"
              type="submit"
            >
              เพิ่มสินค้า
            </button>
          </form>
        </div>
      )}
      <hr className="my-1 border-gray-300" />

      {/* Pagination */}
      <div className="flex justify-center mb-2">
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
      <div className="flex justify-center mb-2">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`my-2 mx-1 px-2 py-1 rounded-sm ${currentPage === i + 1
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