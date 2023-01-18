import {
  Box,
  Button,
  Card,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useFormik } from "formik";
import { PropsWithChildren, useRef, useState } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";

import { createCampaign, getCampaignById } from "../../apis/campaign";
import { CampaignForm } from "../../components/hs/campaign/campaign-form";
import { GoalDetails } from "../../components/hs/goal/goal-details";

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

const stepper = [
  { label: "Enter Campaign Details" },
  { label: "Enter Goal Details" },
];

const StepPanel = (
  props: PropsWithChildren<{ value: number; index: number }>
) => {
  return <>{props.value === props.index ? props.children : null}</>;
};

const CampaignOperation = ({ mode = "create" }: CreateCampaignProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const dataLoader = useLoaderData() as UseQueryResult<
    CreateCampaign | GetCampaign
  >;
  const { data: campaign } = useQuery({
    ...campaignDetailQuery(params.id!),
    initialData: dataLoader.data,
    enabled: !!params.id,
  });
  const campaignMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess(data) {
      navigate(`/campaign/edit/${data.id}`);
    },
  });
  const campaignRef = useRef<CampaignDetailsRef>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <>
      <Card className="flex flex-1 p-4 gap-x-4 w-full">
        {/* Vertical Stepper */}
        <Stepper
          orientation="vertical"
          connector={<StepConnector sx={{ flex: 0 }} />}
          activeStep={activeStep}
        >
          {stepper.map((step) => {
            return (
              <Step key={step.label} disabled={mode === "create"}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box
          display="flex"
          flex={1}
          p="16px 0 16px 16px"
          borderLeft="1px solid #dbdbdb"
          overflow="hidden auto"
        >
          {/* Container components */}
          <StepPanel value={activeStep} index={0}>
            <CampaignForm
              ref={campaignRef}
              campaign={campaign!}
              onSubmit={(payload) => {
                // mutation
                if (!(payload as GetCampaign).id) {
                  // create call
                  campaignMutation.mutate(payload);
                } else {
                  // post call
                  console.log(payload);
                }
              }}
            />
          </StepPanel>
          <StepPanel value={activeStep} index={1}>
            <GoalDetails goals={[]} />
          </StepPanel>
        </Box>
      </Card>
      <div className="flex  py-4 px-6 bg-[#fff] mt-4 mr-[-24px] ml-[-24px] mb-[-24px]">
        {/* Form controls */}
        <div className="inline-flex">
          {mode === "update" ? (
            <>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((index) => index - 1)}
              >
                Back
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="inline-flex flex-1 justify-end gap-x-4">
          {mode === "create" ? (
            <Button
              variant="contained"
              onClick={() => {
                campaignRef.current!.handleSubmit();
              }}
              disabled={campaignMutation.isLoading}
            >
              Create Campaign
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                disabled={activeStep === stepper.length - 1}
                onClick={() => setActiveStep((index) => index + 1)}
              >
                Next
              </Button>
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
      </div>
    </>
  );
};

export { CampaignOperation };
