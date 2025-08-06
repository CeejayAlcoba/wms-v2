import Swal from "sweetalert2";
import type { SweetAlertOptions } from "sweetalert2";
import { THEME_MODE } from "../../constants/LOCAL_STORAGE_KEYS";
import type { ThemeModeType } from "../../contexts/Provider/AntConfigProvider";

export const handleGetSweetAlertTheme = () => {
  const mode = (localStorage.getItem(THEME_MODE) || "light") as ThemeModeType;
  const background = mode === "dark" ? "#1e1e1e" : "#ffffff";
  const color = mode === "dark" ? "#e4dcdcff" : "#000000";
  const confirmButtonColor = "#1677ff";

  return { mode, background, color, confirmButtonColor };
};

const SweetAlert = (options: SweetAlertOptions) => {
  const mode = (localStorage.getItem(THEME_MODE) || "light") as ThemeModeType;

  return Swal.fire({
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    background: mode === "dark" ? "#1e1e1e" : "#ffffff",
    color: mode === "dark" ? "#ffffff" : "#000000",
    confirmButtonColor: "#1677ff",
    ...options,
  });
};

export default SweetAlert;
