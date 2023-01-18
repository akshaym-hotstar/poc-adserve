import { GOAL_TYPE } from "../enums/goal";

export type Goal = {
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
};

export type GetGoal = Goal;
