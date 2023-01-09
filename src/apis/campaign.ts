import { QueryFunctionContext } from "@tanstack/react-query";

import { axiosInstance } from "../utils/axios";

import type {
  BaseAPIParams,
  BlazeAPIResponse,
  CampaignList,
  GetCampaign,
} from "../types";
import { GetCampaignTransform } from "../transformers/campaigns/get-campaign";

const withQuery =
  (fn: Function) =>
  ({ queryKey }: QueryFunctionContext) => {
    const [_, payload] = queryKey;
    return fn(payload);
  };

type GetAllCampaignParams = Partial<{
  tournamentId: number;
  seasonId: number;
  /** @default "desc" */
  direction: "asc" | "desc";
  /** @default "updatedAt" */
  sortKey: "id" | "name" | "status" | "updatedAt";
}>;

const getAllCampaigns = async ({
  tournamentId,
  seasonId,
  direction = "desc",
  sortKey = "updatedAt",
}: BaseAPIParams<GetAllCampaignParams>) => {
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<CampaignList>>(
      "/api/campaign/all/",
      {
        params: {
          ...(tournamentId ? { tournamentId } : null),
          ...(seasonId ? { seasonId } : null),
          direction,
          sortKey,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getCampaignById = async ({
  id,
  transform,
}: BaseAPIParams<{ id: string | number }>) => {
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<GetCampaign>>(
      `/api/campaign/${id}`
    );
    if (transform) {
      const transformer = new GetCampaignTransform();
      return transformer.transformToModel(data.data);
    }
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllCampaignsQuery = withQuery(getAllCampaigns);
const getCampaignByIdQuery = withQuery(getCampaignById);

export {
  getAllCampaigns,
  getAllCampaignsQuery,
  getCampaignById,
  getCampaignByIdQuery,
};
