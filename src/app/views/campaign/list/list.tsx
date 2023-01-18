import { AddOutlined } from "@mui/icons-material";
import { Box, Button, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllCampaignsQuery } from "../../../apis/campaign";
import { GameController } from "../../../components/hs/game-controller";
import { Game, Season, Tournament } from "../../../types";
import { columns } from "./col-defs";

const CampaignList = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [season, setSeason] = useState<Season | null>(null);

  const {
    data: campaigns = [],
    error,
    isError,
  } = useQuery(
    ["campaigns", { tournamentId: tournament?.id, seasonId: season?.id }],
    getAllCampaignsQuery,
    {
      enabled: !!tournament?.id || !!season?.id,
    }
  );

  if (isError) {
    return <div>{(error as any).message}</div>;
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        padding: "1rem",
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        columnGap={2}
      >
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          component={Link}
          to="/campaign/create"
        >
          Create Campaign
        </Button>
        <GameController
          game={game}
          tournament={tournament}
          season={season}
          onGameChange={(newValue) => {
            if (newValue) {
              setGame(newValue);
              setTournament(null);
              setSeason(null);
            }
          }}
          onTournamentChange={(newValue) => {
            if (newValue) {
              setTournament(newValue);
              setSeason(null);
            }
          }}
          onSeasonChange={(newValue) => {
            setSeason(newValue);
          }}
          gameFieldProps={{ size: "small" }}
          tournamentFieldProps={{ size: "small" }}
          seasonFieldProps={{ size: "small" }}
        />
      </Box>
      <DataGrid
        rows={campaigns}
        columns={columns}
        pagination
        initialState={{ columns: { columnVisibilityModel: { id: false } } }}
        getRowHeight={() => "auto"}
      />
    </Card>
  );
};

export { CampaignList };
