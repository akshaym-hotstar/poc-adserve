import { CloseOutlined } from "@mui/icons-material";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useState } from "react";

import { getAllAssetQuery } from "../../../apis/assets";
import { Asset } from "../../../types/asset";
import { columns } from "./asset-col-defs";

type AssetListProps = {
  onSelectedModelChange?: (model: Asset) => any;
};

export const AssetList = (props: AssetListProps) => {
  const { data } = useQuery(
    [
      "assets",
      {
        status: "READY",
        systemLabels: [{ key: "placementType", value: "LIVE" }],
        "systemLabels.placementType": "LIVE",
        type: "VIDEO",
        start: 0,
        limit: 100,
      },
    ],
    getAllAssetQuery
  );

  return (
    <div className="h-full flex p-2">
      <DataGrid
        rows={data?.assets ?? []}
        columns={columns}
        initialState={{ columns: { columnVisibilityModel: { id: false } } }}
        pageSize={30}
        onSelectionModelChange={(model) => {
          const [id] = model;
          const found = data!.assets.find((asset) => asset.id === id);
          if (found) {
            props.onSelectedModelChange?.(found);
          }
        }}
      />
    </div>
  );
};

type AssetListDialogProps = {
  open: boolean;
  handleClose: (evt: {}, reason?: "backdropClick" | "escapeKeyDown") => void;
  onConfirm?: (asset: Asset) => any;
};

export const AssetListDialog = ({
  open,
  handleClose,
  onConfirm,
}: AssetListDialogProps) => {
  const [model, setModel] = useState<Asset | null>(null);
  return (
    <Dialog
      open={open}
      fullScreen
      onClose={(evt, reason) => {
        setModel(null);
        handleClose(evt, reason);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={(evt) => handleClose(evt)}
          >
            <CloseOutlined />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Assets
          </Typography>
          <Button
            disabled={!model}
            variant="contained"
            color="success"
            onClick={() => onConfirm?.(model!)}
          >
            Confirm
          </Button>
        </Toolbar>
      </AppBar>
      <AssetList onSelectedModelChange={setModel} />
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
