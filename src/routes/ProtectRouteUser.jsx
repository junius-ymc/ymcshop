import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; // ✅ import แบบถูกต้อง
import useEcomStore from '../store/ecom-store';
import { currentUser } from '../api/auth';
import LoadingToRedirect from './LoadingToRedirect';

const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false);
    const user = useEcomStore((state) => state.user);
    const token = useEcomStore((state) => state.token);
    const logout = useEcomStore((state) => state.logout); // ✅ ฟังก์ชัน logout ที่เคลียร์ state

    // เช็ค Token หมดอายุ
    useEffect(() => {
        if (user && token) {
            try {
                const decoded = jwtDecode(token); // ✅ ใช้ชื่อใหม่
                const now = Date.now() / 1000; // ปัจจุบันเป็นวินาที
                if (decoded.exp < now) {
                    console.log("❌ Token หมดอายุใน ProtectRouteUser");
                    logout(true); // เคลียร์ token + user
                    setOk(false);
                } else {
                    // ✅ Token ยังไม่หมดอายุ → ไปยิง currentUser
                    currentUser(token)
                        .then(() => setOk(true))
                        .catch(() => setOk(false));
                }
            } catch (err) {
                console.log("❌ Token Invalid", err);
                logout(true);
                setOk(false);
            }
        } else {
            setOk(false);
        }
    }, [user, token]);

    return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
