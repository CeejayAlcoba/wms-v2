import Swal, { type SweetAlertOptions } from "sweetalert2";
import { THEME_MODE } from "../../constants/LOCAL_STORAGE_KEYS";
import type { ThemeModeType } from "../../contexts/Provider/AntConfigProvider";
import { handleGetSweetAlertTheme } from "./SweetAlert";

type SweetAlertProgressProps = {
  progressProps?: SweetAlertOptions;
  progress: number;
};

export default async function SweetAlertProgress({
  progress,
  progressProps = {},
}: SweetAlertProgressProps) {
  const { background, color, confirmButtonColor } = handleGetSweetAlertTheme();

  if (progress < 100 && Swal.isVisible()) {
    Swal.update({
      html: `<b>Progress:  ${progress}%</b>`,
      background,
      color,
      confirmButtonColor,
      ...progressProps,
    });
  } else if (progress < 100 && !Swal.isVisible()) {
    Swal.fire({
      title: `<span>Downloading...</span>`,
      html: `<b>Progress: ${progress}%</b>`,
      allowOutsideClick: false,
      showConfirmButton: false,
      background,
      color,
      confirmButtonColor,
      didOpen: () => {
        Swal.showLoading();
      },
      ...progressProps,
    });
  } else {
    Swal.close();
  }
}
