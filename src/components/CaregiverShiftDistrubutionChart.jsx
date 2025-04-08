import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";


const PieChartComponent = ({ data, chartTitle }) => {
  console.log(data, "care");
  const colors = ["#25578e", "#0fbfae"];

  const getAgeRange = (age) => {
    if (age >= 10 && age <= 20) return "10-20";
    if (age >= 21 && age <= 30) return "21-30";
    if (age >= 31 && age <= 40) return "31-40";
    if (age >= 41 && age <= 50) return "41-50";
    if (age >= 51 && age <= 60) return "51-60";
    if (age > 60) return "60+";
    return "Unknown";
  };

  const groupedData = data.reduce((acc, patient) => {
    const ageRange = getAgeRange(patient.age);
    if (!acc[ageRange]) {
      acc[ageRange] = { name: ageRange, value: 0 };
    }
    acc[ageRange].value += 1; // Increment value for the range
    return acc;
  }, {});


  const formattedData = data.map((data, index) => ({
    name: `${data.firstName} ${data.lastName}`,
    value: data?.age, // Example value, can be dynamic based on the data
    color: colors[index % colors.length],
  //   label: data?.specialization
  // ? data.specialization.charAt(0).toUpperCase() + data.specialization.slice(1).toLowerCase()
  // : data?.age,

  }));

 

  return (

    <div className="dashboard-cards">

      <div className="dashbaord-header">
        <h5>{chartTitle}</h5>
        
      </div>

      <h3 className="data-length font-weight-300">{data.length}</h3>

      <div className="dashboard-pie-chart-box">
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
        
        />
      </div>
    </div>
  );
};

export default PieChartComponent;
