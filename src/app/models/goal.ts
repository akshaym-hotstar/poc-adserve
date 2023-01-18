import { GOAL_TYPE } from "../enums/goal";
import { GetGoal } from "../types";

export class Goal implements GetGoal {
  automateDelivery: boolean;
  campaignId: number;
  customId: string;
  enabled: boolean;
  goalType: GOAL_TYPE;
  id: number;
  impressionTarget: number;
  maximiseReach: boolean;
  name: string;
  overridePreviousAdBreak: boolean;
  previousAdBreakDuration: number;
  priority: number;

  constructor(data: Partial<Goal> = {}) {
    this.automateDelivery = data.automateDelivery;
    this.campaignId = data.campaignId;
    this.customId = data.customId ?? "";
    this.enabled = data.enabled;
    this.goalType = data.goalType ?? GOAL_TYPE.VIDEO;
    this.id = data.id;
    this.impressionTarget = data.impressionTarget;
    this.maximiseReach = data.maximiseReach;
    this.name = data.name ?? "";
    this.overridePreviousAdBreak = data.overridePreviousAdBreak;
    this.previousAdBreakDuration = data.previousAdBreakDuration;
    this.priority = data.priority;
  }
}
