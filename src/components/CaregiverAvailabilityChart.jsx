import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { formatDateOnly } from "../services/utils";

const CaregiverAvailabilityChart = ({ caregivers }) => {
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [weekRange, setWeekRange] = useState(""); // For storing the selected week range

  // Helper function to get the start of a given week (Monday)
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Calculate days to Monday (if Sunday, subtract 6 days)
    const startOfWeek = new Date(date.setDate(date.getDate() + diff));
    startOfWeek.setHours(0, 0, 0, 0); // Set to midnight
    return startOfWeek;
  };

  // Helper function to get the end of a given week (Sunday)
  const getEndOfWeek = (startOfWeek) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday is 6 days after Monday
    endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day
    return endOfWeek;
  };

  // Function to handle week range change from dropdown
  const handleWeekRangeChange = (event) => {
    const selectedRange = event.target.value;
    setWeekRange(selectedRange);

    // Calculate the start and end of the selected week range
    const startDate = new Date(selectedRange);
    const startOfSelectedWeek = getStartOfWeek(startDate);
    const endOfSelectedWeek = getEndOfWeek(startOfSelectedWeek);

    setStartWeek(formatDateOnly(startOfSelectedWeek));
    setEndWeek(formatDateOnly(endOfSelectedWeek));
  };

  // Effect to initialize the default start and end of next week
  useEffect(() => {
    const today = new Date();
    const startOfNextWeek = getStartOfWeek(new Date(today.setDate(today.getDate() + 7)));
    const endOfNextWeek = getEndOfWeek(startOfNextWeek);

    setStartWeek(formatDateOnly(startOfNextWeek));
    setEndWeek(formatDateOnly(endOfNextWeek));
    setWeekRange(formatDateOnly(startOfNextWeek)); // Default to next week
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Step 1: Define all days of the week
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Step 2: Initialize the availability map
  const availabilityMap = allDays.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  // Step 3: Filter and populate availability based on caregiver data
  caregivers?.forEach((caregiver) => {
    caregiver?.availability?.forEach((dateString) => {
      const date = new Date(dateString); // Convert the date string to a Date object

      // Check if the date is within the selected week range
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

  // Step 4: Prepare data for the chart
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
        <div className="dashboard-left-container">
          <h5>Caregiver Availability for Selected Week</h5> {startWeek} - {endWeek}
        </div>
        <div className="dashboard-right-container">
        <FormControl fullWidth margin="normal">
        <InputLabel id="week-range-label">Select Week Start Date</InputLabel>
        <Select
          labelId="week-range-label"
          value={weekRange}
          onChange={handleWeekRangeChange}
          label="Select Week Start Date"
        >
          {/* Dropdown items for selecting the start of the week */}
          {[...Array(12).keys()].map((i) => {
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() + i * 7); // Increment by week
            const startOfMonday = getStartOfWeek(startOfWeek); // Ensure Monday as the start
            const weekStartDate = formatDateOnly(startOfMonday);
            return (
              <MenuItem key={weekStartDate} value={weekStartDate}>
                {weekStartDate}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
        </div>
      </div>

      {/* Dropdown for selecting the week range */}
      

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
