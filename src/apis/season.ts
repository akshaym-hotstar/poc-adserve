import { QueryFunctionContext } from "@tanstack/react-query";
import { BlazeAPIResponse, Season } from "../types";
import { axiosInstance } from "../utils/axios";

export const getAllSeason = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, tournamentId] = queryKey as [string, number];
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<Season[]>>(
      "/api/basic-data/season/",
      {
        params: {
          tournamentId,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
