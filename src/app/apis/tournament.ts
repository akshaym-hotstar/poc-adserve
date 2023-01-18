import { axiosInstance } from "../utils/axios";

import type { BlazeAPIResponse, Tournament } from "../types";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getAllTournament = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, gameId] = queryKey as [string, number];
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<Tournament[]>>(
      `/api/basic-data/tournament/`,
      {
        params: { gameId },
      }
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
