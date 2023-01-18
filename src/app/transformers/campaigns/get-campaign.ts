import type { GetCampaign, GetCampaignDTO, TransformModel } from "../../types";

export class GetCampaignTransform
  implements TransformModel<GetCampaign, GetCampaignDTO>
{
  transformToModel(data: any): GetCampaign {
    return {
      id: data.id,
      campaignTitle: data.name,
      customId: data.customId,
      type: data.type,
      status: data.status,
      brand: data.brand,
      game: data.game,
      season: data.season,
      tournament: data.tournament,
    };
  }

  transformFromModel(model: GetCampaign): GetCampaignDTO {
    return {
      id: model.id,
      name: model.campaignTitle,
      type: model.type,
      customId: model.customId,
      brandId: model.brand.id,
      gameId: model.game.id,
      seasonId: model.season.id,
      tournamentId: model.tournament.id,
    };
  }
}
