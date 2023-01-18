import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
  Tab,
  Tabs,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

import { getAllAudienceTargetQuery } from "../../../apis/audience-target";
import { TabPanel } from "../../TabPanel";
import { AudienceTargetForm } from "./audience-target-form";

type ContentTargetFormProps = {
  index: number;
};

export const AudienceTargetDetails = (
  props: PropsWithChildren<ContentTargetFormProps>
) => {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const { data: audienceTargets = [] } = useQuery(
    ["audience-targets"],
    getAllAudienceTargetQuery
  );

  const handleAccordionTransitionChange = () => {
    if (enabled) {
      setExpanded((prev) => !prev);
    } else {
      setExpanded(false);
    }
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        onClick={handleAccordionTransitionChange}
        expandIcon={
          <ExpandMoreOutlined
            color={enabled ? "action" : "disabled"}
            onClick={(evt) => {
              evt.stopPropagation();
              handleAccordionTransitionChange();
            }}
          />
        }
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: "0 !important",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <span>Audience Targeting</span>
        <Switch
          checked={enabled}
          onClick={(evt) => {
            evt.stopPropagation();
            setEnabled((prev) => {
              if (prev) {
                setExpanded(false);
              }
              return !prev;
            });
          }}
        />
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-y-6">
        <Tabs
          variant="scrollable"
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          sx={{
            borderBottom: "1px solid #dbdbdb",
          }}
        >
          {audienceTargets.map((target) => (
            <Tab key={target.name} label={target.name} />
          ))}
        </Tabs>
        {audienceTargets.map((target, index) => (
          <TabPanel
            key={target.id}
            index={index}
            value={currentTab}
            unmountOnExit={true}
          >
            <AudienceTargetForm key={target.id} target={target} />
          </TabPanel>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
