import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../components/LoaderDiv";
import IconShopping from "../components/icon/IconShopping";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div>
      <div className="div-wrap">
        <Helmet>
          <title>{t("mAboutUs")} | {t("shopName")}</title>
        </Helmet>

        <div className="div-head">{t("mAboutUs")} - ยังทำไม่เสร็จจ้า😅</div>
        <div className="div-content">
          <div className="div-content-box">

            <div className="text-center">
              <p className="text-3xl">{t("shopName")}</p>
              <br />
              <p className="text-2xl">{t("ttInProgress")}</p>
              <br />
              <div className="setgrid-1">
                <div className="text-xl">เนื้อหาที่ - 1</div>
                <div className="text-xl">เนื้อหาที่ - 2</div>
              </div>
              <br />
              <div className="flex justify-center items-center">
                <img className="w-auto" src="/img/Logo-for-test.png" />
              </div>
              <br />
              <div className=" flex justify-center items-center">
                <IconShopping className="icon-shopping" />
              </div>
              <br />
              <br />
              <br />
              <br />
              <LoaderDiv />
              <br />
              <br />
              <br />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
