const languageAll = [
    {
        shopName: 'ワイ-エム-シー ショップ - YMC Shop', // Title Name in index.html
        waitMassCngLang: 'お待ちください... 言語を変更する 日本語-', // chglng.html
        waitMassCngTheme: 'お待ちください... テーマの変更-', // chgtem.html

        ttTileClickToZoom: 'ダブルクリックすると画像が拡大します。🔎',
        ttClose: '近い',

        mHome: 'ホームページ', // src/components/MainNav
        mHome1: '店',
        mShop: '買い物',
        mCart: 'カート',

        mAboutUs: '私たちについて', // src/components/Topweb, Footer
        mContactUs: 'お問い合わせ',

        mUser: 'ユーザー', // (src/components/Sidebar)
        mRegister: '登録する',
        mLogin: 'ログイン',
        mLogout: 'ログアウト',
        mHistory: '注文履歴',

        mLang: '言語', // (src/components/Sidebar)
        mShowLang1: 'ไทย',
        mShowLang2: 'English',
        mShowLang3: '日本語',
        mTheme: 'テーマ',
        mTheme1: 'テーマ 1',
        mTheme2: 'テーマ 2',

        bestSell: 'ベストセラー', // src/pages/Home
        newProd: '新製品',

        minfo: 'ニュース情報', // src/components/home/ContentShowNewProduct
        mShowNewProduct: '最新製品',

        sAllProd: 'すべての製品', // src/pages/Shop
        sPreviousbtn: '前の',
        sNextbtn: '次',
        sSoldOut: '完売',

        sbSearch: '検索',  // src/components/card/SearchCard
        sbProd: '製品',
        sbCategory: 'カテゴリ',
        sbPrice: '価格',
        sbPriceMin: '最小: ',
        sbPriceMax: '最大: ',

        npcAddedToCart1: 'はい',// src/components/card/NewProductCard
        npcAddedToCart2: 'をカートに追加しました。😊',

        ccShoppingCart: 'ショッピングカート',  // src/components/card/CartCard
        ccTotalPrice: '合計金額 :',
        ccPayment: '支払い',

        lcListCart: '合計商品リスト', // src/components/card/ListCart
        lcItem: 'アイテム',
        lcTotal: '合計',
        lcNetTotal: '合計純額',
        lcGotoShop: 'ショップに戻る',
        lcOrderProducts: '商品を注文する',
        lcOrderSuccess: 'カートに追加されました。🛒',

        moneyUnit: '฿.',  

        scShippingAddress: 'お届け先の住所', // src/components/card/SummaryCard
        scFullName: '名前 💷',
        scHouseNo: '家番号',
        scDistrict: '地区',
        scCity: '市',
        scProvince: '州',
        scZipCode: '郵便番号',
        scPhone: '電話番号 📞',
        scSaveAddress: '住所を保存',
        scYourOrder: 'ご注文',
        scQuantity: '量',
        scShippingCosts: '送料',
        scFreeOnlyInThailand: 'タイ国内のみ無料',
        scDiscount: '割引',
        scNetTotal: '純合計',
        scProceedWithPayment: '支払い手続きに進む',
        scVerifyFill: 'すべてのフィールドに入力してください',
        scVerifyPay: '住所を完全に記入してください。次に、まず保存を押します。⛔',

        rgtRegister: '登録する',// src/pages/auth/Register
        rgtSignUp: 'サインアップ',
        rgtGoLogin: 'すでにアカウントをお持ちですか? サインインするにはここをクリックしてください。',
        rgtEmail: 'メール',
        rgtPassword: 'パスワード',
        rgtConPass: 'パスワードを認証する',
        rgtInvalEmail: '無効なメール !!!',
        rgtPassChk: 'パスワードは6文字以上でなければなりません',
        rgtPassCon: 'パスワードが一致しません',
        rgtEmailCheck: 'メールアドレスはすでに存在します !!!',
        rgtRegisterSuccess: '登録成功',
        rgtServerError: 'サーバーエラー !!!',

        liLogin: 'ログイン',  // src/pages/auth/Login
        liSignin: 'サインインしてください',
        liEmail: 'メール',
        liPassword: 'パスワード',
        liGoRegister: 'まだアカウントをお持ちではありませんか? 登録するにはここをクリックしてください。',
        liWelcomeBack: 'おかえり',
        liErrMsg: 'ユーザーが見つからないか、制限されています',
        liPasswordInvalid: 'パスワードが無効です  !!!',
        liServerError: 'サーバーエラー !!!',
        liLogout: 'ログアウトに成功しました',

        htrHistory: '注文履歴',  // src/components/card/History
        htrOrderDate: '注文日',
        // htrStatus: 'ステータス:',
        htrProducts: '製品',
        htrPrice: '価格',
        htrQuantity: '量',
        htrTotal: '合計',
        htrNetTotal: '純合計',
        htrNotProcess: 'まだ実装されていません',
        htrProcessing: '商品の発送中 📦',
        htrCompleted: '商品が配送されました。✅',
        htrCancelled: 'キャンセル ❌',
    }
]
const chgLng = languageAll[0]