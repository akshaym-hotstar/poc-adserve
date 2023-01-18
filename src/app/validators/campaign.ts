import { mixed, number, object, SchemaOf, string } from "yup";

import { CAMPAIGN_TYPE } from "../enums/campaign";
import { CreateCampaign } from "../types";

const create: SchemaOf<CreateCampaign> = object({
  campaignTitle: string().required(),
  customId: string().optional(),
  brand: object({
    id: number().required(),
    name: string().required(),
  }).defined(),
  season: object({
    id: number().required(),
    name: string().required(),
  }).defined(),
  type: mixed<CAMPAIGN_TYPE>().oneOf(Object.values(CAMPAIGN_TYPE)).required(),
});

export { create as createCampaignSchema };
