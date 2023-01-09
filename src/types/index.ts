export interface BlazeAPIResponse<T = any> {
  code: "SUCCESS" | "ERROR";
  data: T;
  message: string;
}

export type NameId<Id = string, Name = string> = {
  id: Id;
  name: Name;
};

export type BaseAPIParams<T> = T & {
  transform?: boolean;
};

export type { Brand, Game, Tournament, Season } from "./basic-data";

export type {
  CampaignList,
  CreateCampaign,
  CreateCampaignDTO,
  GetCampaign,
  GetCampaignDTO,
} from "./campaign";

export type { TransformModel } from "./transform";
