import { OndemandVideoOutlined } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { PropsWithChildren } from "react";

import { useDialog } from "../../../hooks/dialog";
import { CreativeDemandType, CreativeLanguages } from "../../../immutables";
import { AssetListDialog } from "../assets/asset-list";

type CreativeFormType = {};

export const CreativeForm = (props: PropsWithChildren<CreativeFormType>) => {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Box display="flex" flexDirection="column" rowGap={4}>
      <div className="flex gap-x-4">
        <TextField label="Creative Name" variant="filled" value="" fullWidth />
        <TextField
          select
          label="Creative Type"
          value="SSAI"
          sx={{ width: "20ch" }}
          helperText=" "
        >
          <MenuItem value="SSAI">SSAI</MenuItem>
          <MenuItem value="Spot">Spot</MenuItem>
        </TextField>
      </div>
      <div className="flex gap-x-4">
        <TextField
          select
          label="Demand Type"
          value=" "
          sx={{ flex: 1 }}
          placeholder="Select Demand Type"
          helperText=" "
        >
          {Object.entries(CreativeDemandType).map(([id, value]) => {
            return (
              <MenuItem key={value.label} value={id}>
                {value.label}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          label="Creative ID"
          disabled
          sx={{ flex: 1 }}
          helperText=" "
        />
        <TextField label="Custom ID" sx={{ flex: 1 }} helperText=" " />
      </div>
      <div className="flex gap-x-4">
        <FormControl className="flex-1">
          <InputLabel id="stream_multiple_checkbox-label">Stream</InputLabel>
          <Select<string[]>
            multiple
            labelId="stream_multiple_checkbox-label"
            label="Stream"
            value={[]}
            renderValue={(newValue) => newValue.join(",")}
          >
            {CreativeLanguages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                <Checkbox />
                <ListItemText primary={lang} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Landing URL" sx={{ flex: 1 }} />
      </div>
      <div className="flex gap-y-4">
        <FormControlLabel
          label="Enable"
          control={<Switch />}
          labelPlacement="start"
        />
      </div>
      <hr />
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <OndemandVideoOutlined
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleOpen();
            }}
          />
          <TextField
            disabled
            variant="standard"
            label="Asset"
            fullWidth
            helperText=" "
          />
        </div>
        <TextField label="Media File URL" disabled helperText=" " />
        <AssetListDialog
          open={open}
          handleClose={handleClose}
          onConfirm={(model) => {
            console.log(model);
            handleClose({});
          }}
        />
      </div>
    </Box>
  );
};
