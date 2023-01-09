import { CreateCampaign, CreateCampaignDTO, TransformModel } from "../../types";

export class CreateCampaignTransform
  implements TransformModel<CreateCampaign, CreateCampaignDTO>
{
  transformToModel(data: CreateCampaignDTO): CreateCampaign {
    return {
      brand: { id: data.brandId, name: "" },
      season: { id: data.seasonId, name: "" },
      campaignTitle: data.name,
      type: data.type,
      customId: data.customId,
    };
  }
  transformFromModel(model: CreateCampaign): CreateCampaignDTO {
    return {
      name: model.campaignTitle,
      type: model.type,
      customId: model.customId,
      brandId: model.brand.id,
      seasonId: model.season.id,
    };
  }
}
