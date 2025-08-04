import type { StepProps } from "antd";
import type { ReactNode } from "react";
import { CheckCircleOutlined, ContainerOutlined, CreditCardOutlined } from "@ant-design/icons"; 
import ICRPage from "../ICRPage";
import CargoListPage from "../CargoListPage";
import BillingInformation from "../BillingInformationPage";
import type { CheckInByICRDTO } from "../../../../@types/DTOs/CheckInByICRDTO";

type CheckInStepType<T=any> = {
  componentPage: ReactNode;
  field: keyof T & string;
} & StepProps;

export const CHECK_IN_STEPS = [
  {
    title: "ICR",
    field:"bookingDetails",
    description: "ICR check-in",
    icon: <CheckCircleOutlined  />,
    componentPage: <ICRPage />,
  },
  {
    title: "Cargo Details",
    field:"cargoDetails",
    description: "Enter cargo info.",
    icon: <ContainerOutlined  />,
    componentPage: <CargoListPage />,
  },
  {
    title: "Billing",
    field:"billingInfomation",
    description: "Generate billing.",
    icon: <CreditCardOutlined />,
    componentPage: <BillingInformation />,
  },
]as CheckInStepType<CheckInByICRDTO>[];
