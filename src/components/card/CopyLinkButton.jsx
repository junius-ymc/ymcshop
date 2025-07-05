import { useState } from "react";
import { createNofity } from "../../utils/createAlert";
import { useTranslation } from "react-i18next";
import { Share2 } from 'lucide-react';

const CopyLinkButton = ({ productId }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const handleCopy = () => {
    const url = `${window.location.origin}/shop?productId=${productId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // ซ่อนข้อความหลัง 2 วิ
      createNofity("success",
        `${t("sShareLinkCopy")}`,
        `${t("sShareLinkMsg")}`,
        `${t("ttClose")}`,
        `5000`);
    });
  };

  return (
    <div className="relative inline-block w-full">
      <div
        onClick={handleCopy}
        className="shop-product-data-id flex justify-between text-xs cursor-pointer text-[--red] hover:text-[--bluelite]"
      >
        {t("sShareLink")} <Share2 className="size-4"/>
      </div>
      {copied && (
        <span className="absolute w-auto left-[0px] top-[30px] -translate-y-1/2 ml-2 bg-[--gray] text-[--white] text-xs px-2 py-1 rounded">
          ✅ {t("sShareLinkCopy")}
        </span>
      )}
    </div>
  )
}
export default CopyLinkButton