import Swal, { type SweetAlertOptions } from "sweetalert2";

const SweetAlert = (options: SweetAlertOptions) => {
  Swal.fire({
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    ...options,
  });
};

export default SweetAlert;
