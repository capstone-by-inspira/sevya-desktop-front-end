import React from "react";
import ReactApexChart from "react-apexcharts";

const CaregiverAvailabilityChart = () => {
  const caregiverAvailabilityData = [
    { date: "2025-03-01", available: 8 },
    { date: "2025-03-02", available: 6 },
    { date: "2025-03-03", available: 10 },
    { date: "2025-03-04", available: 5 },
    { date: "2025-03-05", available: 12 },
  ];

  // Extracting data for ApexCharts
  const categories = caregiverAvailabilityData.map((item) => item.date);
  const seriesData = caregiverAvailabilityData.map((item) => item.available);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    xaxis: {
      categories: categories,
      labels: { style: { fontSize: "14px" } },
    },
    yaxis: {
      title: { text: "Available Caregivers" },
    },
    colors: ["#4F46E5"], // Custom color for bars
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="caregiver-availability-chart">
      <h3 className="caregiver-availability-chart-heading font-400">Caregiver Availability Over Time</h3>
      <ReactApexChart options={options} series={[{ name: "Available", data: seriesData }]} type="bar" height={350} />
    </div>
  );
};

export default CaregiverAvailabilityChart;
