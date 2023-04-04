import { ResponsivePie } from "@nivo/pie";
import css from "./PieChart.module.css";
import { FC } from "react";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const PieChart: FC<{ data: PieChartData[] }> = ({ data }) => {
  const itemsCount = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className={css.pieChartContainer}>
      <ResponsivePie
        data={data}
        margin={{ top: 7, right: 7, bottom: 7, left: 7 }}
        startAngle={-180}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={5}
        activeOuterRadiusOffset={5}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.25]],
        }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={20}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 1.75]],
        }}
        arcLabel={(e) => {
          return `${((e.value / itemsCount) * 100).toFixed()}%`;
        }}
        colors={{ datum: "data.color" }}
        tooltip={(e) => {
          return (
            <div className={css.tooltipContainer}>
              <div
                className={css.pieChartColor}
                style={{ backgroundColor: e.datum.color }}
              ></div>
              <div className={css.tooltipDesc}>
                <span>{e.datum.label}</span>
                <div className={css.tooltipValues}>
                  {((e.datum.value / itemsCount) * 100).toFixed()}%{" - "}
                  {e.datum.value}
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default PieChart;
