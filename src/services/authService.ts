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

  return { Login };
}

export const authService = _authService();
