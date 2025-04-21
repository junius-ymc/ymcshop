// ✅ File 3: UploadOneFile.jsx (updated to send dynamic image name info)
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removeFiles, uploadFiles } from "../../api/review";
import useEcomStore from '../../store/ecom-store';
import { Loader } from 'lucide-react';
import LoaderDiv from "../../components/LoaderDiv";

const UploadOneFile = ({ formData, setFormData }) => {
    const token = useEcomStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        setLoading(true);
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error(`File ${file.name} บ่แม่นรูป`);
            setIsLoading(false);
            setLoading(false);
            return;
        }

        Resize.imageFileResizer(
            file,
            720,
            720,
            "JPEG",
            100,
            0,
            (data) => {
                // uploadFiles(token, data)
                uploadFiles(token, {
                    image: data,
                    userName: formData.userName,
                    orderedId: formData.orderedId
                  })
                    .then((res) => {
                        setFormData({ ...formData, image: res.data });
                        toast.success('Upload image Success!!!');
                        // console.log(res.data);
                        console.log("Uploading image with:", formData.userName, formData.orderedId);
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error("Upload failed");
                    })
                    .finally(() => {
                        setIsLoading(false);
                        setLoading(false);
                    });
            },
            "base64"
        );
    };

    const handleDelete = (public_id) => {
        if (!formData.image || !formData.image.public_id) return;

        setLoading(true);
        removeFiles(token, public_id)
            .then(() => {
                setFormData({ ...formData, image: null });
                toast.error("ลบรูปภาพเรียบร้อยแล้ว");
            })
            .catch((err) => {
                console.log(err);
                toast.error("ลบรูปไม่สำเร็จ");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {isLoading && <Loader className='w-16 h-16 animate-spin' />}
                {loading && <div className="loader-on-top"><LoaderDiv /></div>}

                {formData.image && (
                    <div className='relative'>
                        <img className='w-24 hover:scale-105' src={formData.image.url} alt='uploaded preview' />
                        <span
                            onClick={() => handleDelete(formData.image.public_id)}
                            className='absolute top-0 right-0 bg-red-500 px-2 py-1 rounded-full text-xs cursor-pointer'>X</span>
                    </div>
                )}
            </div>
            <span className='my-4 font-bold'>เลือกรูปภาพ</span>
            <div>
                <input onChange={handleOnChange} type='file' name='image' />
            </div>
        </div>
    );
};

export default UploadOneFile;
