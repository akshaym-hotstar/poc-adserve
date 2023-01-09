import { CAMPAIGN_STATUS, CAMPAIGN_TYPE } from "../enums/campaign";

import type { Brand, Game, Season, Tournament } from ".";

export type CampaignList = Array<{
  goals: {
    creatives: number;
    enabled: true;
    id: number;
    impressionTarget: number;
    name: string;
  }[];
  id: number;
  name: string;
  status: CAMPAIGN_STATUS;
  type: CAMPAIGN_TYPE;
}>;

export type CreateCampaign = {
  campaignTitle: string;
  customId?: string;
  brand: Brand;
  season: Season;
  type: CAMPAIGN_TYPE;
};

export type CreateCampaignDTO = {
  name: string;
  brandId: number;
  seasonId: number;
} & Pick<CreateCampaign, "customId" | "type">;

export type GetCampaign = {
  id: number;
  status: CAMPAIGN_STATUS;
  game: Game;
  tournament: Tournament;
} & CreateCampaign;

export type GetCampaignDTO = {
  gameId: number;
  tournamentId: number;
} & Pick<GetCampaign, "customId" | "id" | "type"> &
  Pick<CreateCampaignDTO, "name" | "brandId" | "seasonId">;
