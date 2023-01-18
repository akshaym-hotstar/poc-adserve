import { PlayCircle } from "@mui/icons-material";
import { IconButton, Link } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { Asset } from "../../../types/asset";

const assetColDefs: GridColDef[] = [
  {
    field: "id",
  },
  {
    field: "name",
    headerName: "Asset Name",
    flex: 1,
  },
  {
    field: "language",
    headerName: "Language",
    flex: 1,
    valueGetter(params: GridValueGetterParams<Asset>) {
      return params.row?.systemLabels.language ?? null;
    },
  },
  {
    field: "duration",
    headerName: "Duration",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Upload Date",
    flex: 1,
    valueFormatter(params) {
      return (params as any).row?.createdAt.toISOString() ?? null;
    },
  },
  {
    field: "createdBy",
    headerName: "Uploaded By",
    flex: 1,
    valueGetter(params: GridValueGetterParams<Asset>) {
      return (params as any).row?.user.userName ?? null;
    },
  },
  {
    field: "url",
    headerName: "Play",
    flex: 1,
    renderCell(params) {
      return (
        <Link component={IconButton} href={params.value} target="_blank">
          <PlayCircle />
        </Link>
      );
    },
  },
];

export { assetColDefs as columns };
