import React from "react";
import Chart from "react-apexcharts";

const CaregiverShiftPieChart = () => {
  const caregiverShifts = [
    { name: "Alice", shifts: 12 },
    { name: "Bob", shifts: 8 },
    { name: "Charlie", shifts: 15 },
    { name: "David", shifts: 10 },
  ];

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: caregiverShifts.map((c) => c.name),
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
    legend: {
      position: "bottom",
    },
  };

  const series = caregiverShifts.map((c) => c.shifts);

  return (
    <div className="w-full flex justify-center">
      <Chart options={chartOptions} series={series} type="donut" width="400" />
    </div>
  );
};

export default CaregiverShiftPieChart;
