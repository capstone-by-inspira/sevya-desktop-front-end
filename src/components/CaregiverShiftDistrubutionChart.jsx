import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";


const PieChartComponent = ({ data, chartTitle }) => {
  console.log(data, "care");
  const colors = ["#25578e", "#0fbfae"];

  const formattedData = data.map((data, index) => ({
    name: `${data.firstName} ${data.lastName}`,
    value: data?.age, // Example value, can be dynamic based on the data
    color: colors[index % colors.length],
    label: data?.specialization
  ? data.specialization.charAt(0).toUpperCase() + data.specialization.slice(1).toLowerCase()
  : data?.age,

  }));

  return (

    <div className="dashboard-cards">

      <div className="dashbaord-header">
        <h5>{chartTitle}</h5>
        
      </div>

      <h3 className="data-length font-weight-300">{data.length}</h3>

      <PieChart
        className="data-chart"
        series={[
          {
            data: formattedData,
            innerRadius: 50,
            outerRadius: 120,
            paddingAngle: 5,
            cornerRadius: 2,
            startAngle: 0,
            endAngle: 360,
            cx: 170,
            cy: 150,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={350}
        height={350}
        legend={{
          direction: "row", // Change to 'row' if needed
          position: { vertical: "bottom", horizontal: "center" }, // Adjust position
          itemMarkWidth: 20,
          itemMarkHeight: 20,
          markGap: 10,
          labelStyle: {
            fontSize: 12,
            fill: "#333",
          },
        }}
      />
    </div>
  );
};

export default PieChartComponent;
