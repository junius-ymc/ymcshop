import { Link } from "react-router-dom"
import IconCategoryHat from "../icon/IconCategoryHat";
import IconCategoryJackets from "../icon/IconCategoryJackets";
import IconCategoryJeans from "../icon/IconCategoryJeans";
import IconCategoryTShirt from "../icon/IconCategoryTShirt";
import IconCategorySneaker from "../icon/IconCategorySneaker";
import IconCategoryVintage from "../icon/IconCategoryVintage";
import IconCategoryScreenPrinted from "../icon/IconCategoryScreenPrinted";
import IconShopping from "../icon/IconShopping";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import useEcomStore from "../../store/ecom-store";
import { useTranslation } from "react-i18next";

const CategoryMenu = ({ resetSearching }) => {

  // const categories = useEcomStore((state) => state.categories);
  // let sbCategoryId = [];
  const { t } = useTranslation();

  const resetSearch = () => {
    resetSearching();
  };

  return (
    <>
      <section className="shop-head-category-menu-box p-2">
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          centeredSlides={false}
          navigation={false}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        // className="object-cover rounded-md flex justify-center items-center"
        >

          {/* {categories.map((item, index) => (
              sbCategoryId = item.id === 1 ? <IconCategoryVintage className="w-10"/>
                : item.id === 2 ? <IconCategoryTShirt className="w-10"/>
                  : item.id === 3 ? <IconCategoryScreenPrinted className="w-10"/>
                    : item.id === 4 ? <IconCategoryHat className="w-10"/>
                      : item.id === 5 ? <IconCategorySneaker className="w-10"/>
                        : item.id === 6 ? t("sbCategoryId6")
                          : item.id === 7 ? <IconCategoryJeans className="w-10"/>
                            : item.id === 8 ? <IconCategoryJackets className="w-10"/>
                              : item.name,
              <li className="pr-2" key={index}>
                <Link to={`/shop?categoryId=${item.id}`}>
                  <span className="check-box-mod search-card-by-category-text">
                    {sbCategoryId}
                  </span>
                </Link>
              </li>
            ))} */}

          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=1`} className="justify-items-center">
              <IconCategoryVintage className={`
                  icon-category icon-category-1 icon-category-vintage py-1
                  ${localStorage?.getItem("categId") === '1' && "bg-[--gray] rounded-md stroke-[--red]"}
                `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=4`} className="justify-items-center">
              <IconCategoryHat className={`
                  icon-category icon-category-2 icon-category-hat
                  ${localStorage?.getItem("categId") === '4' && "bg-[--gray] rounded-md fill-[--red]"}
                  `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=2`} className="justify-items-center">
              <IconCategoryTShirt className={`
                icon-category icon-category-2 icon-category-tshirt
                ${localStorage?.getItem("categId") === '2' && "bg-[--gray] rounded-md stroke-[--red]"}
                 `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=3`} className="justify-items-center">
              <IconCategoryScreenPrinted className={`
                icon-category icon-category-2 icon-category-screen-printed
                ${localStorage?.getItem("categId") === '3' && "bg-[--gray] rounded-md fill-[--red]"}
                `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=7`} className="justify-items-center">
              <IconCategoryJeans className={`
                icon-category icon-category-2 icon-category-jeans
                ${localStorage?.getItem("categId") === '7' && "bg-[--gray] rounded-md stroke-[--red]"}
                `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=5`} className="justify-items-center">
              <IconCategorySneaker className={`
                icon-category icon-category-2 icon-category-sneaker
                ${localStorage?.getItem("categId") === '5' && "bg-[--gray] rounded-md stroke-[--red]"}
                `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop?categoryId=8`} className="justify-items-center">
              <IconCategoryJackets className={`
                icon-category icon-category-1 icon-category-jackets py-1
                ${localStorage?.getItem("categId") === '8' && "bg-[--gray] rounded-md stroke-[--red]"}
                `} />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="flex items-center justify-center">
            <Link to={`/shop`} className="justify-items-center">
              <button onClick={resetSearch}>
                {/* {t("sAllProd")} */}
                <IconShopping className="icon-category icon-category-2 icon-category-shopping" />
              </button>
            </Link>
          </SwiperSlide>
          <div className="flex items-center justify-center text-md text-[--red]">
            {localStorage?.getItem("categId") === '1' && t("sbCategoryId1")}
            {localStorage?.getItem("categId") === '2' && t("sbCategoryId2")}
            {localStorage?.getItem("categId") === '3' && t("sbCategoryId3")}
            {localStorage?.getItem("categId") === '4' && t("sbCategoryId4")}
            {localStorage?.getItem("categId") === '5' && t("sbCategoryId5")}
            {localStorage?.getItem("categId") === '6' && t("sbCategoryId6")}
            {localStorage?.getItem("categId") === '7' && t("sbCategoryId7")}
            {localStorage?.getItem("categId") === '8' && t("sbCategoryId8")}
          </div>
        </Swiper>
      </section>
    </>
  )
}
export default CategoryMenu