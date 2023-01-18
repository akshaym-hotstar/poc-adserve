import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { AudienceTarget } from "../../../types";

type AudienceTargetInnerFormProps = {
  target: AudienceTarget;
};

export const AudienceTargetForm = ({
  target,
}: AudienceTargetInnerFormProps) => {
  const [clause, setClause] = useState<string | null>(null);
  const [values, setValues] = useState<number[]>([]);

  return (
    <div className="flex p-4 gap-x-6">
      <TextField
        select
        label="Include/Exclude"
        className="w-[300px]"
        value={clause}
        onChange={(evt) => setClause(evt.target.value)}
      >
        {["Include", "Exclude"].map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <FormControl className="w-[300px]">
        <InputLabel id={`${target.name}_multiple_checkbox-label`}>
          {target.name}
        </InputLabel>
        <Select
          multiple
          labelId={`${target.name}_multiple_checkbox-label`}
          className="w-[300px]"
          label={target.name}
          placeholder={target.name}
          value={values}
          onChange={(evt) => {
            setValues(evt.target.value as number[]);
          }}
          renderValue={(newValue) => {
            return newValue
              .reduce((acc, value) => {
                const found = target.values.find(({ id }) => id === value);
                found && acc.push(found.value);
                return acc;
              }, [] as string[])
              .join(", ");
          }}
        >
          {target.values.map(({ value, id }) => (
            <MenuItem key={value} value={id}>
              <Checkbox checked={values.indexOf(id) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
