import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

const PatientOccupancyChart = ({ patients, chartTitle }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Occupancy Rate",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        type: "datetime", // X-axis will represent time (admission/discharge dates)
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Number of Patients",
        },
        min: 0,
      },
   
      colors: ['#25578e'],
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
  });

  // Helper function to calculate the occupancy over time
  const calculateOccupancyData = () => {
    const dataPoints = [];
    const occupancyMap = {};

    patients.forEach((patient) => {
      const admissionDate = dayjs(patient.admissionDate).valueOf(); // Convert admission date to timestamp
      const dischargeDate = dayjs(patient.dischargeDate).valueOf(); // Convert discharge date to timestamp

      if (!admissionDate || !dischargeDate) return; // Skip if any date is invalid

      // Track changes in patient occupancy
      occupancyMap[admissionDate] = (occupancyMap[admissionDate] || 0) + 1;
      occupancyMap[dischargeDate] = (occupancyMap[dischargeDate] || 0) - 1;
    });

    // Convert the occupancyMap into a time series
    const sortedDates = Object.keys(occupancyMap).sort((a, b) => a - b);

    let currentOccupancy = 0;
    sortedDates.forEach((date) => {
      currentOccupancy += occupancyMap[date];
      dataPoints.push([parseInt(date), currentOccupancy]);
    });

    return dataPoints;
  };

  useEffect(() => {
    const occupancyData = calculateOccupancyData();
    setChartData((prevData) => ({
      ...prevData,
      series: [{ name: "Occupancy Rate", data: occupancyData }],
    }));
  }, [patients]);

  return (
    <div className="dashboard-cards">
      <div className="dashboard-header">
        <h5>{chartTitle}</h5>
      </div>

      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default PatientOccupancyChart;
