import Swal from "sweetalert2";

export const createAlert = (icon, text, confirmButtonText, timer) => {
  return Swal.fire({
    icon: icon || "info",
    text: text || "Something Wrong!!",
    confirmButtonText: confirmButtonText || "OK",
    timer: timer || 3000,
  });
};

export const createNofity = (icon, title, text, confirmButtonText, timer) => {
  return Swal.fire({
    position: "top",
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: confirmButtonText || "OK",
    // showConfirmButton: false,
    // showCancelButton: true,
    // cancelButtonColor: "#d33",
    timer: timer || 3000,
    customClass: {
      title: "swal-title-custom",
      confirmButton: "swal-confirmButton-custom",
      popup: "swal-popup-custom",
    },
  });
};
