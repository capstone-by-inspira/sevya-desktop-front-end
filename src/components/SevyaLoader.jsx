import React from "react";
// import styled from "styled-components";

const Loader = () => {
  return (
    // <StyledWrapper>
      <div className="sevya-loader">
        <div className="container">
          <div className="slice" />
          <div className="slice" />
          <div className="slice" />
          <div className="slice" />
          <div className="slice" />
          <div className="slice" />
        </div>
      </div>
    // </StyledWrapper>
  );
};

// const StyledWrapper = styled.div`
//   .sevya-loader {

//     position: absolute;
//     z-index: 1;
//     display: flex;

//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     top: 0%;
//     left: 0%;
//     width: 100vw;
//     height: 100vh;
//     backdrop-filter: brightness(0.3) contrast(1) blur(10px);
//    // background-color:rgba(211, 229, 255, 0.178);
//  //   background-color: rgba(37, 88, 143, 0.271);
//     padding-left:5rem;
//   }
//   .container {
//     --uib-size: 150px;
//     --uib-speed: 2.5s;
//     display: flex;

//     flex-direction: column;
//     align-items: center;

//     justify-content: center;
//     height: var(--uib-size);
//     width: var(--uib-size);
//   }

//   .slice {
//     position: relative;
//     height: calc(var(--uib-size) / 6);
//     width: 100%;
//   }

//   .slice::before,
//   .slice::after {
//     --uib-a: calc(var(--uib-speed) / -2);
//     --uib-b: calc(var(--uib-speed) / -6);
//     content: "";
//     position: absolute;
//     top: 0;
//     left: calc(50% - var(--uib-size) / 12);
//     height: 100%;
//     width: calc(100% / 6);
//     border-radius: 50%;
//     background-color: var(--uib-color);
//     flex-shrink: 0;
//     animation: orbit var(--uib-speed) linear infinite;
//     transition: background-color 0.3s ease;
//   }

//   .slice:nth-child(1)::after {
//     animation-delay: var(--uib-a);
//   }

//   .slice:nth-child(2)::before {
//     animation-delay: var(--uib-b);
//   }

//   .slice:nth-child(2)::after {
//     animation-delay: calc(var(--uib-a) + var(--uib-b));
//   }

//   .slice:nth-child(3)::before {
//     animation-delay: calc(var(--uib-b) * 2);
//   }

//   .slice:nth-child(3)::after {
//     animation-delay: calc(var(--uib-a) + var(--uib-b) * 2);
//   }

//   .slice:nth-child(4)::before {
//     animation-delay: calc(var(--uib-b) * 3);
//   }

//   .slice:nth-child(4)::after {
//     animation-delay: calc(var(--uib-a) + var(--uib-b) * 3);
//   }

//   .slice:nth-child(5)::before {
//     animation-delay: calc(var(--uib-b) * 4);
//   }

//   .slice:nth-child(5)::after {
//     animation-delay: calc(var(--uib-a) + var(--uib-b) * 4);
//   }

//   .slice:nth-child(6)::before {
//     animation-delay: calc(var(--uib-b) * 5);
//   }

//   .slice:nth-child(6)::after {
//     animation-delay: calc(var(--uib-a) + var(--uib-b) * 5);
//   }

//   @keyframes orbit {
//     0% {
//       transform: translateX(calc(var(--uib-size) * 0.25)) scale(0.73684);
//       opacity: 0.65;
//     }

//     5% {
//       transform: translateX(calc(var(--uib-size) * 0.235)) scale(0.684208);
//       opacity: 0.58;
//     }

//     10% {
//       transform: translateX(calc(var(--uib-size) * 0.182)) scale(0.631576);
//       opacity: 0.51;
//     }

//     15% {
//       transform: translateX(calc(var(--uib-size) * 0.129)) scale(0.578944);
//       opacity: 0.44;
//     }

//     20% {
//       transform: translateX(calc(var(--uib-size) * 0.076)) scale(0.526312);
//       opacity: 0.37;
//     }

//     25% {
//       transform: translateX(0%) scale(0.47368);
//       opacity: 0.3;
//     }

//     30% {
//       transform: translateX(calc(var(--uib-size) * -0.076)) scale(0.526312);
//       opacity: 0.37;
//     }

//     35% {
//       transform: translateX(calc(var(--uib-size) * -0.129)) scale(0.578944);
//       opacity: 0.44;
//     }

//     40% {
//       transform: translateX(calc(var(--uib-size) * -0.182)) scale(0.631576);
//       opacity: 0.51;
//     }

//     45% {
//       transform: translateX(calc(var(--uib-size) * -0.235)) scale(0.684208);
//       opacity: 0.58;
//     }

//     50% {
//       transform: translateX(calc(var(--uib-size) * -0.25)) scale(0.73684);
//       opacity: 0.65;
//     }

//     55% {
//       transform: translateX(calc(var(--uib-size) * -0.235)) scale(0.789472);
//       opacity: 0.72;
//     }

//     60% {
//       transform: translateX(calc(var(--uib-size) * -0.182)) scale(0.842104);
//       opacity: 0.79;
//     }

//     65% {
//       transform: translateX(calc(var(--uib-size) * -0.129)) scale(0.894736);
//       opacity: 0.86;
//     }

//     70% {
//       transform: translateX(calc(var(--uib-size) * -0.076)) scale(0.947368);
//       opacity: 0.93;
//     }

//     75% {
//       transform: translateX(0%) scale(1);
//       opacity: 1;
//     }

//     80% {
//       transform: translateX(calc(var(--uib-size) * 0.076)) scale(0.947368);
//       opacity: 0.93;
//     }

//     85% {
//       transform: translateX(calc(var(--uib-size) * 0.129)) scale(0.894736);
//       opacity: 0.86;
//     }

//     90% {
//       transform: translateX(calc(var(--uib-size) * 0.182)) scale(0.842104);
//       opacity: 0.79;
//     }

//     95% {
//       transform: translateX(calc(var(--uib-size) * 0.235)) scale(0.789472);
//       opacity: 0.72;
//     }

//     100% {
//       transform: translateX(calc(var(--uib-size) * 0.25)) scale(0.73684);
//       opacity: 0.65;
//     }
//   }

//   .slice:nth-child(1)::before,
//   .slice:nth-child(1)::after {
//     background-color: #25578e;
//   }

//   .slice:nth-child(2)::before,
//   .slice:nth-child(2)::after {
//     background-color: #578fca;
//   }

//   .slice:nth-child(3)::before,
//   .slice:nth-child(3)::after {
//     background-color: #bdd9b0;
//   }

//   .slice:nth-child(4)::before,
//   .slice:nth-child(4)::after {
//     background-color: #bdd9b0;
//   }

//   .slice:nth-child(5)::before,
//   .slice:nth-child(5)::after {
//     background-color: #10b981;
//   }

//   .slice:nth-child(6)::before,
//   .slice:nth-child(6)::after {
//     background-color: #10b981;
//   }
// `;

export default Loader;
