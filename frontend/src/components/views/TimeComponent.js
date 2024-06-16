import React from "react";

const TimeComponent = (props) => {
  const timeString = props.timeString;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timeString));

  return <>{formattedDate}</>;
};
export default TimeComponent;
