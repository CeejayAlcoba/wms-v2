import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

export default function genericService<T = any>(path: string) {
  const GetAll = async (filters?: Partial<T>) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<T[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  const GetSingle = async (filters?: T) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<T>(`${path}?${queryParams}`);
    return data;
  };
  const GetById = async (id: number) => {
    const { data } = await axiosInstance.get<T>(`${path}/${id}`);
    return data;
  };

  const Update = async (id: number, data: T) => {
    const { data: reponseData } = await axiosInstance.patch<T>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };
  const Add = async (data: T) => {
    const { data: reponseData } = await axiosInstance.post<T>(path, data);
    return reponseData;
  };
  const Delete = async (id: number) => {
    const { data: reponseData } = await axiosInstance.delete<T>(
      `${path}/${id}`
    );
    return reponseData;
  };

  return { GetAll, GetById, Update, Add, Delete, GetSingle };
}
