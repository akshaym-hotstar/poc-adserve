import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { CAMPAIGN_TYPE } from "./enums/campaign";
import { queryClient } from "./utils/react-query";
import {
  CampaignOperation,
  loader as campaignLoader,
} from "./views/campaign/campaign-op";
import { CampaignList } from "./views/campaign/list/list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "campaigns",
        element: <CampaignList />,
      },
      {
        path: "campaign/edit/:id",
        element: <CampaignOperation mode="update" />,
        loader: campaignLoader(queryClient),
      },
      {
        path: "campaign/create",
        element: <CampaignOperation />,
        loader: () => {
          return {
            data: {
              campaignTitle: "",
              brand: null,
              customId: "",
              season: null,
              type: CAMPAIGN_TYPE.CLIENT,
            },
          };
        },
      },
    ],
  },
]);
