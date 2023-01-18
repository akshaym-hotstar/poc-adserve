import { FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { PropsWithChildren } from "react";

import { GOAL_TYPE } from "../../../enums/goal";

import type { GetGoal } from "../../../types";

type GoalFormProps = {
  index: number;
  prefix: string;
  goal: GetGoal;
};

const GoalForm = ({ goal, ...props }: PropsWithChildren<GoalFormProps>) => {
  const { handleChange, handleBlur } = useFormikContext();

  return (
    <div className="flex flex-1 py-4 flex-col gap-y-6  ">
      <div className="flex gap-x-4">
        <TextField
          label="Goal Name"
          required
          fullWidth
          variant="filled"
          name={`${props.prefix}.name`}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText=" "
          value={goal.name}
        />
      </div>
      <div className="flex gap-x-4">
        <TextField
          fullWidth
          label="Impression Target"
          placeholder="Please enter integer value"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 5,
            min: 0,
          }}
          name={`${props.prefix}.impressionTarget`}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText=" "
          value={goal.impressionTarget}
        />
        <TextField
          label="Custom ID"
          name={`${props.prefix}.customId`}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          helperText=" "
          value={goal.customId}
        />
        <TextField
          select
          fullWidth
          label="Priority"
          name={`${props.prefix}.priority`}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText=" "
        >
          {[1, 2, 3, 4, 5].map((prio) => (
            <MenuItem key={prio} value={prio}>
              {prio}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="flex gap-x-4">
        <TextField
          sx={{ flex: 1 }}
          select
          label="Goal Type"
          name={`${props.prefix}.goalType`}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText=" "
        >
          {Object.values(GOAL_TYPE).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          sx={{ flex: 1 }}
          label="Automate Delivery"
          control={
            <Switch
              name={`${props.prefix}.automateDelivery`}
              onChange={handleChange}
            />
          }
        />
        <FormControlLabel
          sx={{ flex: 1 }}
          label="Maximise Reach"
          control={
            <Switch
              name={`${props.prefix}.maximiseReach`}
              onChange={handleChange}
            />
          }
        />
      </div>
      <div className="flex gap-x-4">
        <FormControlLabel
          sx={{ flex: 1 }}
          label="Enable"
          control={
            <Switch name={`${props.prefix}.enabled`} onChange={handleChange} />
          }
        />
        <FormControlLabel
          sx={{ flex: 1 }}
          label="Override Previous Ad Break Rule"
          control={
            <Switch
              name={`${props.prefix}.overridePreviousAdBreak`}
              onChange={handleChange}
            />
          }
        />
        <TextField
          sx={{ flex: 1 }}
          label="Override Duration (in minutes)"
          name={`${props.prefix}.previousAdBreakDuration`}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText=" "
        />
      </div>
    </div>
  );
};

export { GoalForm };
