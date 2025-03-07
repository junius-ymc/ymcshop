// rafce
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  // กำหนดช่วงราคา ในการค้นหาราคาสินค้า
  const sPriceStart = 0; // เริ่มตั้งแต่ราคาต่ำสุด
  const sPriceMin = 1; // ระหว่างราคาจากต่ำสุด
  const sPriceMax = 5000; // ระหว่างราคาถึงสูงสุด
  const sPriceOver = 10000; // ถึงราคาสูงสุด

  const [price, setPrice] = useState([sPriceMin, sPriceMax]);
  const [ok, setOk] = useState(false);

  // console.log(categories)
  useEffect(() => {
    getCategory();
  }, []);

  // Step 1 Search Text
  // console.log(text)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        // actionSearchFilters({ query: text });
        actionSearchFilters({ query: text.toUpperCase() }); // ✅ แปลงเป็นพิมพ์เล็ก
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Step 2 Search by Category
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
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected)

  // Step 3 Search by Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);
  const handlePrice = (value) => {
    //  console.log(value);
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div>
      <div className="search-card-head">

        <p className="div-head">{t("sbSearch")}</p>
        <div className="div-content search-card-box">
          <div className="search-card-by-text">{t("sbProd")}</div>
          {/* Search by Text */}
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder={t("sbSearch") + " " + t("sbProd") + "...."}
            className="form-input"
          />
          <hr />
          {/* Search by Category */}
          <div className="search-card-by-category-box">
            <div className="search-card-by-category">{t("sbCategory")}</div>

            <div className="search-card-by-category-check-status">

              {categories.map((item, index) => (
                <div key={index} className="search-card-by-category-input">
                  <label>
                    <input onChange={handleCheck} value={item.id} type="checkbox" />
                    <span className="check-box-mod search-card-by-category-text"> {item.name}</span>
                  </label>
                </div>
              ))}

            </div>
          </div>

          <hr />
          {/* Search by Price */}
          <div className="search-card-by-price-box">
            <h1 className="search-card-by-price">{t("sbPrice")}</h1>
            <div>
              <div className="search-card-by-price-value ">
                <span>{t("sbPriceMin")}{numberFormat(price[0])}{t("moneyUnit")}</span>
                <span>{t("sbPriceMax")}{numberFormat(price[1])}{t("moneyUnit")}</span>
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
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
