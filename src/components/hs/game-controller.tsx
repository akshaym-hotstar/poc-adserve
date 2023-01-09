import {
  Autocomplete,
  AutocompleteProps,
  Box,
  BoxProps,
  BoxTypeMap,
  createFilterOptions,
  MenuItem,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ComponentProps } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllGames } from "../../apis/game";
import { getAllSeason } from "../../apis/season";
import { getAllTournament } from "../../apis/tournament";

import type { Game, NameId, Season, Tournament } from "../../types";

const filterOptions = createFilterOptions<NameId<number>>({
  matchFrom: "any",
  limit: 100,
});

export type GameControllerProps = {
  containerProps?: ComponentProps<typeof Box>;
  game: Game | null;
  tournament: Tournament | null;
  season: Season | null;
  onGameChange: (game: Game | null) => void;
  onTournamentChange: (tournament: Tournament | null) => void;
  onSeasonChange: (season: Season | null) => void;
  gameFieldProps?: ComponentProps<typeof TextField>;
  tournamentFieldProps?: Partial<
    ComponentProps<typeof Autocomplete<Tournament>>
  >;
  seasonFieldProps?: Partial<ComponentProps<typeof Autocomplete<Season>>>;
};

const GameController = ({
  game,
  tournament,
  season,
  onGameChange,
  onTournamentChange,
  onSeasonChange,
  ...props
}: GameControllerProps) => {
  const queryClient = useQueryClient();
  const { data: games = [] } = useQuery(["games"], getAllGames);
  const { data: tournaments = [] } = useQuery(
    ["tournaments", game?.id],
    getAllTournament,
    {
      enabled: !!game?.id,
    }
  );
  const { data: seasons = [] } = useQuery(
    ["seasons", tournament?.id],
    getAllSeason,
    {
      enabled: !!tournament?.id,
    }
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      columnGap={2}
      {...props.containerProps}
    >
      <TextField
        select
        id="game-select"
        label="Game"
        value={game?.id ?? ""}
        onChange={(evt) => {
          const item = games.find(
            ({ id }) => id === parseInt(evt.target.value)
          );
          if (item) {
            onGameChange(item);
            queryClient.invalidateQueries(["tournaments"]);
          }
        }}
        disabled={!games.length}
        sx={{ width: "200px" }}
        {...props.gameFieldProps}
      >
        {games.map((game) => {
          return (
            <MenuItem key={game.name} value={game.id}>
              {game.name}
            </MenuItem>
          );
        })}
      </TextField>
      <Autocomplete
        sx={{ width: 300 }}
        value={tournament}
        options={tournaments}
        filterOptions={filterOptions}
        getOptionLabel={(item) => item.name}
        disabled={!game?.id}
        renderInput={(params) => <TextField {...params} label="Tournaments" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        onChange={(_, newValue) => {
          onTournamentChange(newValue);
          queryClient.invalidateQueries(["seasons"]);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        {...props.tournamentFieldProps}
      />
      <Autocomplete
        sx={{ width: 300 }}
        value={season}
        options={seasons}
        filterOptions={filterOptions}
        getOptionLabel={(item) => item.name}
        disabled={!tournament?.id}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Seasons" />}
        onChange={(_, newValue) => {
          onSeasonChange(newValue);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}  
        {...props.seasonFieldProps}
      />
    </Box>
  );
};

export { GameController };
