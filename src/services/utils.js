export const formatTimestamp = (timestamp, timeZone = "UTC") => {
    const date = new Date(timestamp);
  
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone, // Default to UTC, can be changed
    });
  };
  
  export const formatDateOnly = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  export const formatTimeOnly = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };
  

 export const convertToUTC = (date, time) => {
    // Combine the date and time into a single string
    const dateTimeString = `${date}T${time}:00`; // Adding seconds to the time for completeness
    
    // Create a Date object
    const localDate = new Date(dateTimeString);
    
    // Convert the local date to UTC and get the ISO string
    const utcDate = localDate.toISOString(); // This will convert it to UTC and format as ISO 8601
    
    console.log(utcDate);  // Logs in the format: '2025-03-04T10:30:00.000Z'
    
    return utcDate;
  };

  export const convertDateToFormat = (dateString) => {
    // Create the date object explicitly using UTC
    const date = new Date(Date.UTC(
      parseInt(dateString.split('-')[0]),  // Year
      parseInt(dateString.split('-')[1]) - 1,  // Month (zero-indexed)
      parseInt(dateString.split('-')[2]) + 1 // Day
    ));
  
    // Format the date as "Month Day, Year"
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  