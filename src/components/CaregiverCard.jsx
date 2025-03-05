// import React from "react";
// import { useDrag } from "react-dnd";

// const CaregiverCard = ({ caregiver }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: "CAREGIVER",
//     item: { caregiverId: caregiver.id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className={`bg-white p-4 rounded-lg shadow-md cursor-pointer ${
//         isDragging ? "opacity-50" : ""
//       }`}
//     >
//       <h3 className="text-md font-semibold">{caregiver.firstName} {caregiver.lastName}</h3>
//     </div>
//   );
// };

// export default CaregiverCard;
