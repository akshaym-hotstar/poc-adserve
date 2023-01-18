import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { TabPanel } from "../../TabPanel";
import { CreativeForm } from "./creative-form";

type CreativeDetailsProps = {};

export const CreativeDetails = (
  props: PropsWithChildren<CreativeDetailsProps>
) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreOutlined />}
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: "0 !important",
          },
        }}
      >
        Creative Details
      </AccordionSummary>
      <AccordionDetails>
        <Tabs
          value={0}
          variant="scrollable"
          sx={{ borderBottom: "1px solid #dbdbdb" }}
        >
          <Tab label="Creative 1" />
        </Tabs>
        <TabPanel value={0} index={0} className="py-4">
          <CreativeForm />
        </TabPanel>
      </AccordionDetails>
    </Accordion>
  );
};
