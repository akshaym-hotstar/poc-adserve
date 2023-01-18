import {
  Autocomplete,
  Box,
  createFilterOptions,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllBrand } from "../../../apis/brand";
import { CAMPAIGN_TYPE } from "../../../enums/campaign";
import { createCampaignSchema } from "../../../validators/campaign";
import { GameController } from "../game-controller";

import type {
  CreateCampaign,
  Game,
  GetCampaign,
  NameId,
  Tournament,
} from "../../../types";

type CampaignFormProps = {
  campaign: CreateCampaign | GetCampaign;
  onSubmit: (campaign: CreateCampaign | GetCampaign) => void;
};

const campaignType = [
  { label: "Client", value: CAMPAIGN_TYPE.CLIENT },
  { label: "Promo", value: CAMPAIGN_TYPE.PROMO },
];

const filterOptions = createFilterOptions<NameId<number>>({
  matchFrom: "any",
  limit: 100,
});

const CampaignForm = forwardRef(function CampaignDetails(
  { campaign, onSubmit }: PropsWithChildren<CampaignFormProps>,
  ref
) {
  const [game, setGame] = useState<Game | null>(
    (campaign as GetCampaign).game ?? null
  );
  const [tournament, setTournament] = useState<Tournament | null>(
    (campaign as GetCampaign).tournament
  );

  const { data: brands = [] } = useQuery(["brands"], getAllBrand);
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: campaign,
    validationSchema: createCampaignSchema,
    onSubmit: (values) => onSubmit(values),
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        values,
        errors,
        handleSubmit,
      };
    },
    [values, errors]
  );

  return (
    <Box
      noValidate
      component="form"
      display="flex"
      flex={1}
      flexDirection="column"
      rowGap={4}
      onSubmit={handleSubmit}
    >
      <div className="flex gap-x-4">
        <TextField
          fullWidth
          required
          id="campaign_title_input"
          label="Campaign Title"
          name="campaignTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.campaignTitle}
        />
        <TextField
          sx={{ width: "32ch" }}
          id="campaign_id_input"
          label="Custom ID"
          name="customId"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.customId}
        />
      </div>
      <div className="flex gap-x-2">
        <TextField
          select
          required
          name="type"
          label="Campaign Type"
          sx={{ flex: 1 }}
          value={values.type}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {campaignType.map((type) => (
            <MenuItem key={type.label} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </TextField>
        <Autocomplete
          sx={{ flex: 1 }}
          value={values.brand}
          options={brands}
          filterOptions={filterOptions}
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField {...params} required label="Brands" />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          )}
          onChange={(_, newValue) => {
            setFieldValue("brand", newValue);
          }}
          onBlur={handleBlur}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </div>
      <GameController
        game={game}
        tournament={tournament}
        season={values.season}
        onGameChange={(newValue) => {
          if (newValue) {
            setGame(newValue);
            setTournament(null);
            setFieldValue("season", null);
          }
        }}
        onTournamentChange={(newValue) => {
          if (newValue) {
            setTournament(newValue);
            setFieldValue("season", null);
          }
        }}
        onSeasonChange={(newValue) => {
          setFieldValue("season", newValue);
        }}
        gameFieldProps={{ sx: { flex: 1 } }}
        tournamentFieldProps={{ sx: { flex: 1 } }}
        seasonFieldProps={{
          sx: { flex: 1 },
          renderInput: (params) => (
            <TextField {...params} label="Seasons" required />
          ),
        }}
      />
    </Box>
  );
});

export { CampaignForm };
