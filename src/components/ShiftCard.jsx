import React from "react";
import { useDrag } from "react-dnd";

const ShiftCard = ({ data, from }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SHIFT",
    item: { ...data, from },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all shift-card ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="text-md font-semibold">{data.caregiver}</h3>
      <p className="text-sm text-gray-500">
        {data.start_time} - {data.end_time}
      </p>
    </div>
  );
};

export default ShiftCard;
