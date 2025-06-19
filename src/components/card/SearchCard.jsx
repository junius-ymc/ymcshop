// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconSearchTitle from "../icon/IconSearchTitle";
import '../../style/checkbox.css'

const SearchCard = ({ resetPage }) => {
  // const products = useEcomStore((state) => state.products);
  const getProduct = useEcomStore((state) => state.getProduct);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  // กำหนดช่วงราคา ในการค้นหาราคาสินค้า
  const sPriceStart = 0; // เริ่มตั้งแต่ราคาต่ำสุด
  const sPriceMin = 1; // ระหว่างราคาจากต่ำสุด
  const sPriceMax = 5000; // ระหว่างราคาถึงสูงสุด
  const sPriceOver = 10000; // ถึงราคาสูงสุด
  const [price, setPrice] = useState([sPriceMin, sPriceMax]);
  const [ok, setOk] = useState(false);

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  let sbCategoryId = [];

  const [activeTab, setActiveTab] = useState("category");
  const tabStyle = (tab) =>
    `rounded-bl-none rounded-br-none px-4 py-2 rounded-md mx-1 font-bold ${activeTab === tab ? "bg-[--red] text-[--white]" : "bg-[--bgcontent] text-[--gray]"
    }`;

  // console.log(categories)
  useEffect(() => {
    getCategory();
  }, []);

  // ✅ Step 1: ค้นหาด้วย Text
  // console.log(text)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        // actionSearchFilters({ query: text });
        actionSearchFilters({ query: text.toLowerCase() }); // ✅ แปลงเป็นพิมพ์เล็ก
        resetPage(); // ✅ รีเซ็ตไปหน้าแรก
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        getProduct();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [text]);

  // ✅ Step 2: ค้นหาด้วย Category
  const handleCheck = (e) => {
    // console.log(e.target.value)
    const inCheck = e.target.value; // ค่าที่เรา ติ๊ก
    const inState = [...categorySelected]; // [1,2,3] arr ว่าง
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);
    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
      resetPage(); // ✅ รีเซ็ตไปหน้าแรก
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected)

  // ✅ Step 3: ค้นหาด้วย Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    //  console.log(value);
    setPrice(value);
    resetPage(); // ✅ รีเซ็ตไปหน้าแรก
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setOk(!ok);
    }, 500);
  };

  return (
    <div className="search-card-head">
      <div className="div-head modal-cartcard-head setdiv-3">
        <span>
          <IconSearchTitle className="icon-search-title" />
        </span>
        {t("sbSearch")}
      </div>
      <div className="search-card-box">

        <div className="">
          {/* Tabs */}
          <div className="flex items-center justify-between px-4">
            <button className={tabStyle("category")} onClick={() => setActiveTab("category")}>
              {t("sbSearchCategory")}
            </button>
            <button className={tabStyle("search")} onClick={() => setActiveTab("search")}>
              {t("sbSearchProduct")}
            </button>
            <button className={tabStyle("price")} onClick={() => setActiveTab("price")}>
              {t("sbSearchPrice")}
            </button>
          </div>

          {/* Content */}
          <div className="flex items-center w-full min-h-[120px] rounded-md border border-[--red]">

            {activeTab === "category" && <div className="w-full p-4 px-5">
              {/* Search by Category */}
              <div className="search-card-by-category-box">
                <div className="search-card-by-category">{t("sbCategory")}
                  <p className="search-card-by-category-text-1">{t("sbCategorySelect")}</p>
                </div>
                <div className="search-card-by-category-check-status">

                  {categories.map((item, index) => (

                    sbCategoryId = item.id === 1 ? t("sbCategoryId1")
                      : item.id === 2 ? t("sbCategoryId2")
                        : item.id === 3 ? t("sbCategoryId3")
                          : item.id === 4 ? t("sbCategoryId4")
                            : item.id === 5 ? t("sbCategoryId5")
                              : item.id === 6 ? t("sbCategoryId6")
                                : item.id === 7 ? t("sbCategoryId7")
                                  : item.id === 8 ? t("sbCategoryId8")
                                    : item.name,

                    // <div key={index} className="search-card-by-category-input">
                    //   <label>
                    //     <input onChange={handleCheck} value={item.id} type="checkbox" />
                    //     <span className="check-box-mod search-card-by-category-text"> {sbCategoryId} </span>
                    //   </label>
                    // </div>

                    <div key={index} className="checkbox-wrapper-19 search-card-by-category-input">
                      <input type="checkbox" onChange={handleCheck} value={item.id} id={item.id} />
                      <label for={item.id} className="check-box" />
                      <label for={item.id} className="check-box-mod search-card-by-category-text">
                        <span>
                          {sbCategoryId}
                        </span>
                      </label>
                    </div>

                  ))}
                </div>
              </div>
            </div>}

            {activeTab === "search" && <div className="w-full p-4 px-5">
              {/* Search by Text */}
              <div className="search-card-by-text">
                {t("sbProd")}
                <p className="search-card-by-category-text-1">{t("sbProdSelect")}</p>
              </div>
              <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder={t("sbSearch") + " " + t("sbProd") + "...."}
                className="form-input"
              />
            </div>}

            {activeTab === "price" && <div className="w-full p-4 px-5">
              {/* Search by Price */}
              <div className="search-card-by-price-box">
                <div className="search-card-by-price">
                  {t("sbPrice")}
                  <p className="search-card-by-category-text-1">{t("sbPriceSelect")}</p>
                </div>
                <div>
                  <div className="search-card-by-price-value ">
                    <span>{t("sbPriceMin")}<strong>{numberFormat(price[0])}</strong> {t("moneyUnit")}</span>
                    <span>{t("sbPriceMax")}<strong>{numberFormat(price[1])}</strong> {t("moneyUnit")}</span>
                  </div>
                  <Slider
                    onChange={handlePrice}
                    range
                    min={sPriceStart}
                    max={sPriceOver}
                    defaultValue={[sPriceMin, sPriceMax]}
                  />
                </div>
              </div>
            </div>}

          </div>
        </div>

      </div>

    </div>
  );
};

export default SearchCard;
