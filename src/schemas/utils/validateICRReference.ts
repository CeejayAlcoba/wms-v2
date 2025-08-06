import { bookingDetailsService } from "../../services/bookingDetailsService";

let checkTimeOut: ReturnType<typeof setTimeout>;

const validateICRReference = (value: string) => {
  if (checkTimeOut) clearTimeout(checkTimeOut);

  return new Promise((resolve) => {
    checkTimeOut = setTimeout(async () => {
      const bookings = await bookingDetailsService.GetAll({
        icrReferenceNumber: value,
      });
      resolve(bookings);
    }, 500);
  });
};

export default validateICRReference;
