import { AssetResponse } from "../apis/assets";

type AssetDTO = {
  createdAt: Date;
  createdBy: string;
  customId: string;
  id: string;
  isDeleted: boolean;
  lastModifiedAt: Date;
  lastModifiedBy: string;
  name: string;
  ownerReferenceId: string;
  primaryStatus: "UPLOADED";
  systemLabels: [
    {
      key: string;
      value: string;
    }
  ];
  type: "VIDEO";
  userLabels: [string];
};

type Asset = Omit<AssetDTO, "systemLabels"> & {
  systemLabels: Record<string, string>;
  user: AssetResponse["userResponse"];
};

export type { AssetDTO, Asset };
