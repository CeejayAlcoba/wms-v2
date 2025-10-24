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

  const Update = async (id: number | undefined, data: T) => {
    checkNotNullId(id);
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
  const Delete = async (id: number | undefined) => {
    checkNotNullId(id);
    const { data: reponseData } = await axiosInstance.delete<T>(
      `${path}/${id}`
    );
    return reponseData;
  };

  const checkNotNullId = (id: number | undefined) => {
    if (!id) throw new Error("Id is null");
  };

  return { GetAll, GetById, Update, Add, Delete, GetSingle };
}
