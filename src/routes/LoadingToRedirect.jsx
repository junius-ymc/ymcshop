import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import LoaderDiv from '../components/LoaderDiv'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

    useEffect(() => {
        setLoading(true); // เริ่มโหลด
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedirect(true)
                    setLoading(false); // โหลดเสร็จ
                }
                return currentCount - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="div-wrap">
            {/* No Permission, Redirect in {count} */}
            {loading && (<div className="div-content"><div className="loader"><LoaderDiv />{count}</div></div>)}
        </div>
    )
}

export default LoadingToRedirect