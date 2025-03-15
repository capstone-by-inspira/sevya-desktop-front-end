

import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Paper, Typography } from "@mui/material";

const data = [
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#25578e'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},
  { name: "Group D", value: 200 , color:'#0fbfae'},


 
];

const PieChartComponent = () => {
  return (
    <div
     className="dashboard-cards"
    >
      <Typography variant="h6" gutterBottom>
        Example Pie Chart
      </Typography>

      <PieChart
        series={[
          {
            data: data,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 2,
            startAngle: -0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
        width={300}
        height={300}
      />
    </div>
  );
};

export default PieChartComponent;
