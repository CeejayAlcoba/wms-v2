import type { ChangePasswordDTO } from "../@types/DTOs/ChangePasswordDTO";
import type { ForgotPasswordRequestDTO } from "../@types/DTOs/ForgotPasswordRequestDTO";
import type { LoginDTO } from "../@types/DTOs/LoginDTO";
import type { LoginResponseDTO } from "../@types/DTOs/LoginReponseDTO";
import axiosInstance from "./axiosIntance";
import _genericService from "./genericService";

const path = "auth";

function _authService() {
  const Login = async (values: LoginDTO) => {
    const { data } = await axiosInstance.post<LoginResponseDTO>(
      `${path}/login`,
      values
    );
    return data;
  };

  const ForgotPasswordRequest = async (values: ForgotPasswordRequestDTO) => {
    const { data } = await axiosInstance.post<string>(
      `${path}/forgot-password-request`,
      values
    );
    return data;
  };

  const ForgotPasswordCheckToken = async (token: string) => {
    const { data } = await axiosInstance.get<string>(
      `${path}/forgot-password-request/${token}`
    );
    return data;
  };

  const ChangePassword = async (values: ChangePasswordDTO) => {
    await axiosInstance.post(`${path}/change-password`, values);
  };

  return {
    Login,
    ForgotPasswordRequest,
    ForgotPasswordCheckToken,
    ChangePassword,
  };
}

export const authService = _authService();
