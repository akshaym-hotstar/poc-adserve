import { axiosInstance } from "../utils/axios";

import type { BlazeAPIResponse, Game } from "../types";

export const getAllGames = async () => {
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<Game[]>>(
      "/api/basic-data/game"
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
