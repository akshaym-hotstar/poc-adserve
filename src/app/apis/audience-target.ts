import { axiosInstance } from "../utils/axios";
import { withQuery } from "../utils/react-query";

import type { BlazeAPIResponse, AudienceTargets } from "../types";

const getAllAudienceTarget = async () => {
  try {
    const { data } = await axiosInstance.get<BlazeAPIResponse<AudienceTargets>>(
      "/api/basic-data/audience-targeting"
    );
    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllAudienceTargetQuery = withQuery(getAllAudienceTarget);

export { getAllAudienceTarget, getAllAudienceTargetQuery };
