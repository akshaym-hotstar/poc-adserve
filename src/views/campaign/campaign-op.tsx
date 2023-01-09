import {
  Box,
  Button,
  Card,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";
import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRef } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";

import { getCampaignById } from "../../apis/campaign";
import { CampaignDetails } from "../../components/hs/campaign-details";

import type { CreateCampaign, GetCampaign } from "../../types";

const campaignDetailQuery = (id: number | string) => ({
  queryKey: ["campaign", "details", id],
  queryFn: async () => getCampaignById({ id, transform: true }),
});

export const loader =
  (queryClient: QueryClient) =>
  ({ params }: LoaderFunctionArgs) => {
    const query = campaignDetailQuery(params.id!);
    return queryClient.ensureQueryData(query);
  };

export type CreateCampaignProps = {
  /** @default "create" */
  mode?: "create" | "update";
};

export type CampaignDetailsRef = Pick<
  ReturnType<typeof useFormik<CreateCampaign>>,
  "handleSubmit" | "errors" | "values"
>;

const CampaignOperation = ({ mode = "create" }: CreateCampaignProps) => {
  const params = useParams();
  const dataLoader = useLoaderData() as UseQueryResult<
    CreateCampaign | GetCampaign
  >;
  const { data: campaign } = useQuery({
    ...campaignDetailQuery(params.id!),
    initialData: dataLoader.data,
  });
  const campaignRef = useRef<CampaignDetailsRef>(null);
  const stepper = [
    { label: "Enter Campaign Details" },
    { label: "Enter Goal Details" },
    { label: "Enter Creative Details" },
  ];

  return (
    <>
      <Card sx={{ display: "flex", flex: 1, p: 2, columnGap: 2 }}>
        {/* Vertical Stepper */}
        <Stepper
          orientation="vertical"
          connector={<StepConnector sx={{ flex: 0 }} />}
        >
          {stepper.map((step) => {
            return (
              <Step key={step.label} disabled={mode === "create"}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box display="flex" flex={1} p={2} borderLeft="1px solid #dbdbdb">
          {/* Container components */}
          <CampaignDetails
            ref={campaignRef}
            campaign={campaign!}
            onSubmit={(payload) => {
              // mutation
              if (!(payload as GetCampaign).id) {
                // create call
              } else {
                // post call
                console.log(payload);
              }
            }}
          />
        </Box>
      </Card>
      <div className="flex py-4 px-6 justify-end bg-[#fff] mt-4 mr-[-24px] ml-[-24px] mb-[-24px]">
        {/* Form controls */}
        {mode === "create" ? (
          <Button
            variant="contained"
            onClick={() => {
              campaignRef.current!.handleSubmit();
            }}
          >
            Save
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => {
                campaignRef.current!.handleSubmit();
              }}
            >
              Update
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export { CampaignOperation };
