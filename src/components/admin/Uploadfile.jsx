// rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { Loader } from 'lucide-react';
import LoaderDiv from "../LoaderDiv";

const Uploadfile = ({ form, setForm }) => {
    // Javascript
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        // code
        setIsLoading(true);
        setLoading(true); // เริ่มโหลด
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            // let allFiles = form.images  // [] empty array
            let allFiles = [...form.images]; // ✅ ใช้สำเนาเพื่อให้ React อัปเดต UI ได้
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                // Validate
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`);
                    setIsLoading(false);
                    setLoading(false);
                    continue;
                }
                // Image Resize 
                Resize.imageFileResizer(
                    files[i],
                    720, // 720 กำหนดขนาด กว้าง ของรูป
                    720, // 720 กำหนดขนาด ยาว ของรูป
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                // console.log(res);
                                allFiles.push(res.data);
                                setForm({ ...form, images: allFiles }); // ✅ อัปเดต state อย่างถูกต้อง
                                setIsLoading(false);
                                toast.success('Upload image Sucess!!!');
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsLoading(false);
                            })
                            .finally(() => {
                                setLoading(false) // โหลดเสร็จ
                            })
                    },
                    "base64"
                )

            }
        }
    }

    // console.log(form)

    const handleDelete = (public_id) => {
        const images = form.images
        setLoading(true);
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    // console.log(item)
                    return item.public_id !== public_id
                })

                console.log('filterImages', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false) // โหลดเสร็จ
            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {isLoading && <Loader className='w-16 h-16 animate-spin' />}
                {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img className='w-24 hover:scale-105' src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-full text-xs cursor-pointer'>X</span>
                        </div>
                    )
                }
            </div>
            <span className='my-4 font-bold'>เลือกรูปภาพ</span>
            <div>
                <input onChange={handleOnChange} type='file' name='images' multiple />
            </div>
        </div>
    )
}

export default Uploadfile