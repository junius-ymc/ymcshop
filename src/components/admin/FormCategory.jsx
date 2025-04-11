// rafce
import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const FormCategory = () => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)
    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        // code
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill data')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} success!!!`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        console.log(id)
        try {
            const res = await removeCategory(token, id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory(token)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='admin-div-category'>
            <hr />
            <h1 className='text-lg'>Category Management</h1>
            <form className='admin-div-category' onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    className='form-input form-input-admin-style'
                    type='text'
                    placeholder="หมวดหมู่สินค้า"
                />
                <button className='bttn btn-mod btn-admin-style'>Add Category</button>
            </form>
            <hr />
            <ul>
                {
                    categories.map((item, index) =>
                        <li
                            className='flex items-center justify-between my-2'
                            key={index}>
                            <span className='px-1'>
                                {item.name}
                            </span>

                            <button
                                className='bttn btn-mod-1 btn-admin-style'
                                onClick={() => handleRemove(item.id)}
                            >
                                Delete
                            </button>
                        </li>
                    )
                }
            </ul>
            <hr />
        </div>
    )
}

export default FormCategory