import type { NameId } from ".";

type AudienceTarget = {
  categoryName: string;
  values: {
    id: number;
    value: string;
  }[];
} & NameId<number>;

type AudienceTargets = Array<AudienceTarget>;

export type { AudienceTarget, AudienceTargets };
