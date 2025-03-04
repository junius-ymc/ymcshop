const languageAll = [
    {   
        shopName: 'วายเอ็มซี ช็อป - YMC Shop', // Title Name in index.html
        waitMassCngLang: 'รอแป้บนะจ๊ะ... กำลังเปลี่ยนภาษา ไทย-', // chglng.html
        waitMassCngTheme: 'รอแป้บนะจ๊ะ... กำลังเปลี่ยนธีม แบบที่-', // chgtem.html

        ttTileClickToZoom: 'ดับเบิ้ลคลิ้กเพื่อซูมดูรูป 🔎',
        ttClose: 'ปิด',

        mHome: 'หน้าหลัก', // src/components/MainNav
        mHome1: 'หน้าร้าน',
        mShop: 'ร้านค้า',
        mCart: 'ตะกร้า',

        mAboutUs: 'เกี่ยวกับเรา', // src/components/Topweb, Footer
        mContactUs: 'ติดต่อเรา',

        mUser: 'ผู้ใช้งาน', // (src/components/Sidebar)
        mRegister: 'สมัคสมาชิก',
        mLogin: 'เข้าสู่ระบบ',
        mLogout: 'ออกจากระบบ',
        mHistory: 'ประวัติการซื้อ',

        mLang: 'ภาษา',  // (src/components/Sidebar)
        mShowLang1: 'ไทย',
        mShowLang2: 'English',
        mShowLang3: '日本語',
        mTheme: 'ธีม',
        mTheme1: 'ธีม1',
        mTheme2: 'ธีม2',

        bestSell: 'สินค้าขายดี', // src/pages/Home
        newProd: 'สินค้าเข้ามาใหม่',

        minfo: 'ข่าวประชาสัมพันธ์', // src/components/home/ContentShowNewProduct
        mShowNewProduct: 'ใหม่ล่าสุด',

        sAllProd: 'สินค้าทั้งหมด', // src/pages/Shop
        sPreviousbtn: 'ก่อนหน้า',
        sNextbtn: 'ถัดไป',
        sSoldOut: 'ขายออกไปแล้ว',

        sbSearch: 'ค้นหา',  // src/components/card/SearchCard
        sbProd: 'ข้อมูลสินค้า',
        sbCategory: 'หมวดหมู่สินค้า',
        sbPrice: 'ราคาสินค้า',
        sbPriceMin: 'เริ่ม: ',
        sbPriceMax: 'ถึง: ',

        npcAddedToCart1: 'ใส่',// src/components/card/NewProductCard
        npcAddedToCart2: 'ไว้ในตะกร้าแล้วจ้า 😊',

        ccShoppingCart: 'ตะกร้าสินค้า',  // src/components/card/CartCard
        ccTotalPrice: 'ยอดรวมทั้งหมด :',
        ccPayment: 'ชำระเงิน',

        lcListCart: 'รายการสินค้าทั้งหมด', // src/components/card/ListCart
        lcItem: 'รายการ',
        lcTotal: 'ยอดรวมทั้งหมด',
        lcNetTotal: 'รวมสุทธิ',
        lcGotoShop: 'กลับไปที่ร้านค้า',
        lcOrderProducts: 'สั่งซื้อสินค้า',
        lcOrderSuccess: 'บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า 🛒',

        moneyUnit: '฿.', 

        scShippingAddress: 'ที่อยู่ในการจัดส่ง', // src/components/card/SummaryCard
        scFullName: 'ชื่อและนามสกุล 💷',
        scHouseNo: 'บ้านเลขที่',
        scDistrict: 'ตำบล',
        scCity: 'อำเภอ',
        scProvince: 'จังหวัด',
        scZipCode: 'รหัสไปรษณีย์',
        scPhone: 'เบอร์โทรศัพท์ 📞',
        scSaveAddress: 'บันทึกที่อยู่',
        scYourOrder: 'คำสั่งซื้อของคุณ',
        scQuantity: 'จำนวน',
        scShippingCosts: 'ค่าจัดส่ง',
        scFreeOnlyInThailand: 'ฟรีเฉพาะในประเทศไทย',
        scDiscount: 'ส่วนลด',
        scNetTotal: 'ยอดรวมสุทธิ',
        scProceedWithPayment: 'ดำเนินการชำระเงิน',
        scVerifyFill: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        scVerifyPay: 'กรุณากรอกที่อยู่ให้เรียบร้อย แล้วกดปุ่มบันทึกที่อยู่ก่อนจ้า ⛔',

        rgtRegister: 'ลงทะเบียน',// src/pages/auth/Register
        rgtSignUp: 'ลงทะเบียนสมัคสมาชิก',
        rgtGoLogin: 'มีบัญชีอยู่แล้ว? คลิกที่นี่เพื่อลงชื่อเข้าใช้งาน',
        rgtEmail: 'อีเมลที่คุณใช้ในปัจจุบัน',
        rgtPassword: 'ตั้งพาสเวิร์ดด้วยตัวเอง',
        rgtConPass: 'ยืนยันพาสเวิร์ดอีกครั้ง',
        rgtInvalEmail: 'อีเมลไม่ถูกต้องจ้า !!!',
        rgtPassChk: 'รหัสผ่าน ต้องมีมากกว่า 6 ตัวอักษรขึ้นไปนะจ๊ะ',
        rgtPassCon: 'รหัสผ่าน ไม่ตรงกันเด้อ',
        rgtEmailCheck: 'อีเมลนี้เคยใช้สมัครสมาชิกแล้ว !!!',
        rgtRegisterSuccess: 'ลงทะเบียนสมัครสมาชิกสำเร็จแล้ว',
        rgtServerError: 'มีการผิดพลาดทางด้านเซิร์ฟเวอร์ !!!',

        liLogin: 'ล็อคอิน',  // src/pages/auth/Login
        liSignin: 'กรุณาลงชื่อเข้าใช้',
        liEmail: 'อีเมล',
        liPassword: 'รหัสผ่าน',
        liGoRegister: 'ยังไม่มีบัญชีใช่ไหม? คลิกที่นี่เพื่อลงทะเบียน',
        liWelcomeBack: 'ยินดีต้อนรับกลับเข้าสู่ระบบอีกครั้ง',
        liErrMsg: 'ไม่พบผู้ใช้นี้ หรือคุณถูกจำกัดสิทธิ์ในการใช้งาน',
        liPasswordInvalid: 'รหัสผ่านไม่ถูกต้องจ้า !!!',
        liServerError: 'เซิร์ฟเวอร์เกิดการผิดพลาดบางประการ !!!',
        liLogout: 'ออกจากระบบเรียบร้อยแล้ว',

        htrHistory: 'ประวัติการสั่งซื้อ',  // src/components/card/History
        htrOrderDate: 'วันที่สั่งซื้อ',
        // htrStatus: 'สถานะ:',
        htrProducts: 'สินค้า',
        htrPrice: 'ราคา',
        htrQuantity: 'จำนวน',
        htrTotal: 'รวม',
        htrNetTotal: 'รวมสุทธิ',
        htrNotProcess: 'ยังไม่ดำเนินการจัดส่ง',
        htrProcessing: 'อยู่ระหว่างดำเนินการจัดส่ง 📦',
        htrCompleted: 'จัดส่งสินค้าเรียบร้อยแล้ว ✅',
        htrCancelled: 'สินค้าถูกยกเลิก ❌',
    }
]
const chgLng = languageAll[0]