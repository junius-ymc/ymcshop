// rafce
import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import {
    createProduct,
    readProduct,
    listProduct,
    updateProduct
} from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "Core i7",
    description: "desc",
    price: 200,
    quantity: 20,
    categoryId: '',
    images: []
}
const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // code
        getCategory()
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token, id, form) => {
        try {
            // code
            const res = await readProduct(token, id, form)
            console.log('res from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log('Err fetch data', err)
        }
    }
    console.log(form)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`เพิ่มและแก้ไขข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">แก้ไขข้อมูลสินค้า</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='Title'
                    name='title'
                />
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='Description'
                    name='description'
                    rows="4"
                    // cols="30"
                />
                <input
                    type='number'
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='price'
                    name='price'
                />
                <input
                    type='number'
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='quantity'
                    name='quantity'
                />
                <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                </div>
                <hr />
                {/* Upload file  */}
                <Uploadfile form={form} setForm={setForm} />

                <button className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">แก้ไขสินค้า</button>
                

                <hr />
                <br />

            </form>
        </div>
    )
}

export default FormEditProduct