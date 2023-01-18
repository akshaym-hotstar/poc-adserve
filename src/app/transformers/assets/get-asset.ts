import { AssetResponse } from "../../apis/assets";
import type { TransformModel } from "../../types";
import type { AssetDTO, Asset } from "../../types/asset";

class GetAssetTransform implements TransformModel<Asset> {
  transformToModel(data: any): Asset {
    const cloned = structuredClone(data.assetResponse);
    const systemLabels = cloned.systemLabels.reduce(
      (acc: Asset["systemLabels"], item: AssetDTO["systemLabels"][0]) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>
    );
    return {
      ...cloned,
      createdAt: new Date(cloned.createdAt),
      lastModifiedAt: new Date(cloned.lastModifiedAt),
      systemLabels,
      user: data.userResponse,
    };
  }

  transformFromModel(model: Asset) {
    return model;
  }
}

export { GetAssetTransform };
