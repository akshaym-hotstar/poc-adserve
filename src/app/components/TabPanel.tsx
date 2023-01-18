import type { ComponentProps, PropsWithChildren } from "react";

type TabPanelProps = {
  value: number;
  index: TabPanelProps["value"];
  unmountOnExit?: boolean;
} & ComponentProps<"div">;

export function TabPanel(props: PropsWithChildren<TabPanelProps>) {
  const { children, value, index, unmountOnExit, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {unmountOnExit ? children : value === index ? children : null}
    </div>
  );
}
