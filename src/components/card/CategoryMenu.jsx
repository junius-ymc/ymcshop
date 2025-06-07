import { Link } from "react-router-dom"
import IconCategoryHat from "../icon/IconCategoryHat";
import IconCategoryJackets from "../icon/IconCategoryJackets";
import IconCategoryJeans from "../icon/IconCategoryJeans";
import IconCategoryTShirt from "../icon/IconCategoryTShirt";
import IconCategorySneaker from "../icon/IconCategorySneaker";
import IconCategoryVintage from "../icon/IconCategoryVintage";
import IconCategoryScreenPrinted from "../icon/IconCategoryScreenPrinted";
import IconShopping from "../icon/IconShopping";
// import useEcomStore from "../../store/ecom-store";
// import { useTranslation } from "react-i18next";

const CategoryMenu = ({ resetSearching }) => {

  // const categories = useEcomStore((state) => state.categories);
  // const { t } = useTranslation();
  // let sbCategoryId = [];

  const resetSearch = () => {
    resetSearching();
  };

  return (
    <>
      <section className="shop-head-category-menu-box mb-3 py-2">
        <div className="">
          {/* <ul className="flex items-center justify-center"> */}
          <ul className="flex items-center justify-between px-2">
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
            <li className="pr-2">
              <Link to={`/shop?categoryId=1`}>
                {/* <IconCategoryVintage className="max-w-8 w-[100%] h-auto" /> */}
                <IconCategoryVintage className="icon-category icon-category-1 icon-category-vintage py-1" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=2`}>
                <IconCategoryTShirt className="icon-category icon-category-2 icon-category-tshirt" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=3`}>
                <IconCategoryScreenPrinted className="icon-category icon-category-2 icon-category-screen-printed" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=4`}>
                <IconCategoryHat className="icon-category icon-category-2 icon-category-hat" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=5`}>
                <IconCategorySneaker className="icon-category icon-category-2 icon-category-sneaker" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=7`}>
                <IconCategoryJeans className="icon-category icon-category-2 icon-category-jeans" />
              </Link>
            </li>
            <li className="pr-2">
              <Link to={`/shop?categoryId=8`}>
                <IconCategoryJackets className="icon-category icon-category-1 icon-category-jackets py-1" />
              </Link>
            </li>
            <li className="pl-2 pr-1">
              <Link to={`/shop`}>
                <button onClick={resetSearch}>
                  {/* {t("sAllProd")} */}
                  <IconShopping className="icon-category icon-category-2 icon-category-shopping" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
export default CategoryMenu