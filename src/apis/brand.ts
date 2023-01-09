import { axiosInstance } from "../utils/axios";

import type { BlazeAPIResponse, Brand } from "../types";

export const getAllBrand = async () => {
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<Brand[]>>(
      "/api/basic-data/brand/"
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
