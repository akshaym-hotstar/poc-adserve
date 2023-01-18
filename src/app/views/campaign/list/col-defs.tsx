import { EditOutlined } from "@mui/icons-material";
import { IconButton, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import type { CampaignList } from "../../../types";

export const columns: GridColDef[] = [
  {
    field: "id",
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerAlign: "center",
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    headerAlign: "center",
  },
  {
    field: "goalName",
    headerName: "Goal Name",
    flex: 1,
    cellClassName: "p-0",
    headerAlign: "center",
    renderCell(params) {
      return <GoalRender goals={params.row.goals} propKey="name" />;
    },
  },
  {
    field: "goalStatus",
    headerName: "Status",
    headerAlign: "center",
    renderCell(params) {
      const { goals } = params.row as CampaignList[0];
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          {goals.map((goal) => (
            <Switch key={goal.id} checked={goal.enabled} disabled />
          ))}
        </div>
      );
    },
  },
  {
    field: "goalImpression",
    headerName: "Impression",
    width: 150,
    cellClassName: "p-0",
    headerAlign: "center",
    renderCell(params) {
      return <GoalRender goals={params.row.goals} propKey="impressionTarget" />;
    },
  },
  {
    field: "goalCreatives",
    headerName: "Goal Creatives",
    width: 150,
    cellClassName: "p-0",
    headerAlign: "center",
    renderCell(params) {
      return <GoalRender goals={params.row.goals} propKey="creatives" />;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "center",
    renderCell(params) {
      const { id } = params.row as CampaignList[0];
      return (
        <Box display="flex" flex={1} justifyContent="center">
          <IconButton component={Link} to={`/campaign/edit/${id}`}>
            <EditOutlined />
          </IconButton>
        </Box>
      );
    },
  },
];

type GoalRenderProps = {
  goals: CampaignList[0]["goals"];
  propKey: keyof CampaignList[0]["goals"][0];
};

const GoalRender = ({ goals, propKey }: PropsWithChildren<GoalRenderProps>) => {
  return (
    <div
      className="MuiDataGrid-cellContent"
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {goals.map(
        (
          goal: CampaignList[0]["goals"][0],
          index: number,
          arr: CampaignList[0]["goals"]
        ) => {
          return (
            <div
              key={goal.id}
              style={{
                padding: "8px 16px",
                width: "100%",
                textAlign: "center",
                ...(index !== arr.length - 1
                  ? { borderBottom: "1px solid #e0e0e0" }
                  : null),
              }}
            >
              {goal[propKey]}
            </div>
          );
        }
      )}
    </div>
  );
};
