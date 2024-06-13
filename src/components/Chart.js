import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const Chart = ({ data }) => {
  const tooltipStyle = { fontSize: "20px" };
  const legendStyle = { fontSize: "20px" };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" tick={{ fontSize: "20px" }} />
        <YAxis tick={{ fontSize: "20px" }} />
        <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipStyle} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey="Notă" fill="#8884d8">
          <LabelList
            dataKey="Notă"
            position="top"
            style={{ fontSize: "20px" }}
          />
        </Bar>
        <Bar dataKey="Prag" fill="#82ca9d">
          <LabelList
            dataKey="Prag"
            position="top"
            style={{ fontSize: "20px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
