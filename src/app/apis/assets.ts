import { axiosInstance } from "../utils/axios";
import { withQuery } from "../utils/react-query";

import type { AssetDTO } from "../types/asset";
import { GetAssetTransform } from "../transformers/assets/get-asset";

export type AssetResponse = {
  assetResponse: AssetDTO;
  userResponse: {
    id: number;
    userEmail: string;
    userName: string;
  };
};

type BlazeAssetResponse<T> = {
  responses: T[];
  totalElements: number;
};

type GetAllAssetParam = {
  status: "READY";
  systemLabels: [{ key: string; value: string }];
  "systemLabels.placementType": "LIVE";
  type: "VIDEO";
  start: number;
  limit: number;
};

const getAllAsset = async (payload: GetAllAssetParam) => {
  try {
    const transformer = new GetAssetTransform();
    const { data } = await axiosInstance.post<
      BlazeAssetResponse<AssetResponse>
    >("/api/ad/assets/search/", payload);
    const assets = data.responses.map((asset) => {
      return transformer.transformToModel(asset);
    });
    return {
      assets,
      totalElements: data.totalElements,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllAssetQuery = withQuery(getAllAsset);

export { getAllAsset, getAllAssetQuery };
