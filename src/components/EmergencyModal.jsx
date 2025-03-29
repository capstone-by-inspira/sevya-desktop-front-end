import React, { useState, useEffect, useRef } from "react";
import EmergencyIcon from '../assets/emergencyIcon.png'
import { formatTimestamp, formatDateOnly } from "../services/utils";
const EmergencyModal = ({ triggerAlert, caregivers }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const audioRef = useRef(null);
  const [isShaking, setIsShaking] = useState(false);

  const [caregiverEmergency, setCaregiverEmergency] = useState(null);

  console.log(caregivers, "alert>>>>>>>>>>>>");
  console.log(triggerAlert, "alert>>>>>>>>>>>>");
  //   console.log(occurrences, 'asston');

  useEffect(() => {
    if (triggerAlert.alert == true) {
      const caregiver = caregivers.find(
        (c) => c.id === triggerAlert.caregiverId
      );
      console.log(caregiver, "caregiver emregcrntuc");
      setCaregiverEmergency(caregiver);
      setIsModalOpen(true);
      setIsShaking(true); // Start the shake when modal opens

      // Stop shaking after 2 seconds
      setTimeout(() => setIsShaking(false), 2000);
      playNotificationSound();
    } else {
      setIsModalOpen(null);

      stopNotificationSound();
    }
  }, [triggerAlert, caregivers]);

  useEffect(() => {
    if (caregivers.length > 0) {
    }
  }, [caregivers, triggerAlert]);

  const close = () => {
    setIsModalOpen(false);
    stopNotificationSound();
  };

  const playNotificationSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("./emergencyTone.mp3");
    }
    audioRef.current.loop = true; // Keep looping until stopped
    audioRef.current
      .play()
      .catch((error) => console.error("Audio play failed:", error));
  };

  const stopNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio
      audioRef.current = null; // Clear reference
    }
  };

  return (
    <div className="custom-modal-maker">
      <div
        id="modal-container"
        className={`${
          isModalOpen == true
            ? "four"
            : isModalOpen == false
            ? "fourClose"
            : isModalOpen == null
            ? ""
            : ""
        }`}
      >
        <div className="modal-background sevya-emergency">
          <div className={`modal-sevya ${isShaking ? "shake" : ""}`}>
            <div className="modal-body-emergency">
              <div className="modal-body-content">
                  <div className="emergency-icon">
                   <img src={EmergencyIcon} alt="emergency icon" />

                    <div className="emergency-title">
                    <h4>Emergency Occurence</h4>
                  </div>
                  </div>
                 
                  <div className="emergency-body">
                    <p><span className="font-weight-400">Caregiver :</span> {caregiverEmergency?.firstName} {caregiverEmergency?.lastName} </p>
                    {/* <p><span className="font-weight-400">Location :</span> {caregiverEmergency?.location}</p> */}
                    <p><span className="font-weight-400">Time :</span> {formatTimestamp(triggerAlert?.timestamp)}</p>
                  </div>
                  <button className="emergency-sevya-button" onClick={close}>
                    Acknowledge
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
