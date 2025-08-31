import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { BookingDetails } from "../tables/BookingDetails";

export type BookingDetailsFilterDTO =  BookingDetails & IPaginationFilter;
