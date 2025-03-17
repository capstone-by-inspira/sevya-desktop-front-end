import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "@mui/material";
import { formatDateOnly } from "../services/utils";

const CaregiverAvailabilityChart = ({ caregivers }) => {
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");

  // Helper function to get the start of the upcoming week (next Monday)
  const getStartOfNextWeek = (date = new Date()) => {
    const day = date.getDay();
    // If today is Sunday, move to the next Monday, otherwise calculate the next Monday
    const diff = (day === 0 ? 1 : 8) - day;
    const startOfNextWeek = new Date(date.setDate(date.getDate() + diff));
    startOfNextWeek.setHours(0, 0, 0, 0); // Set to midnight for the start of the day
    return startOfNextWeek;
  };

  // Helper function to get the end of the upcoming week (next Sunday)
  const getEndOfNextWeek = (startOfNextWeek) => {
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // Sunday is 6 days after Monday
    endOfNextWeek.setHours(23, 59, 59, 999); // Set to the end of the day
    return endOfNextWeek;
  };

  // Effect to set the start and end of the next week on component mount
  useEffect(() => {
    const startOfNextWeek = getStartOfNextWeek();
    const endOfNextWeek = getEndOfNextWeek(startOfNextWeek);

    setStartWeek(formatDateOnly(startOfNextWeek));
    setEndWeek(formatDateOnly(endOfNextWeek));
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Step 1: Define all days of the week
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const availabilityMap = allDays.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  // Step 2: Filter and populate availability based on caregiver data
  caregivers?.forEach((caregiver) => {
    caregiver?.availability?.forEach((dateString) => {
      const date = new Date(dateString); // Convert the date string to a Date object

      // Check if the date is within the upcoming week
      if (date >= new Date(startWeek) && date <= new Date(endWeek)) {
        const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // Get the day of the week (e.g., "Monday")

        // Normalize the day format (capitalize the first letter)
        const formattedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();

        if (availabilityMap.hasOwnProperty(formattedDay)) {
          availabilityMap[formattedDay] += 1; // Count caregivers available on this day
        }
      }
    });
  });

  // Step 3: Prepare data for the chart
  const categories = allDays; // Ensure days are always in order
  const seriesData = allDays.map((day) => availabilityMap[day]); // Get counts for each day

  const options = {
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#0fbfae", "#25578e"], // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: []
      }
    },
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
    colors: ["#0fbfae", "#25578e"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="dashboard-cards">
      <div className="dashbaord-header">
        <h5>Caregiver Availability for Upcoming Week</h5> {startWeek} - {endWeek} 
      </div>
      <ReactApexChart
        options={options}
        series={[{ name: "Available", data: seriesData }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default CaregiverAvailabilityChart;
