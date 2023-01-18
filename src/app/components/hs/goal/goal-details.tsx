import { Box, Tab, Tabs } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";

import { Goal } from "../../../models/goal";
import { TabPanel } from "../../TabPanel";
import { AudienceTargetDetails } from "../audience-targeting/audience-target-details";
import { CreativeDetails } from "../creatives/creative-details";
import { GoalForm } from "./goal-form";

import type { GetGoal } from "../../../types";

type GoalDetailsProps = {
  goals: GetGoal[];
};

const GoalDetails = ({ goals = [] }: GoalDetailsProps) => {
  return (
    <Box component="form" className="flex flex-1 flex-col w-full">
      <Tabs
        value={0}
        sx={{
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <Tab label="Goal 1" />
      </Tabs>
      <Formik
        initialValues={{ goals: !!goals.length ? goals : [new Goal()] }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <FieldArray
                name="goals"
                render={() => {
                  return (
                    <>
                      {values.goals.map((value, index) => {
                        return (
                          <TabPanel
                            key={index}
                            value={0}
                            index={index}
                            className="flex flex-col py-4 px-1 w-full"
                          >
                            <GoalForm
                              index={index}
                              prefix={`goals[${0}]`}
                              goal={value}
                            />
                            <AudienceTargetDetails index={index} />
                            <CreativeDetails />
                          </TabPanel>
                        );
                      })}
                    </>
                  );
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export { GoalDetails };
