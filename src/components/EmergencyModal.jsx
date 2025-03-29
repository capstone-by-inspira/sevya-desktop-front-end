import React, { useState, useEffect, useRef } from "react";

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
                    <svg
                      width="93"
                      height="113"
                      viewBox="0 0 93 113"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M79.2726 76.6197L79.2042 76.7366C78.0966 78.6307 76.0556 79.7961 73.8452 79.7961H19.1544C16.9579 79.7961 14.9034 78.6314 13.7954 76.7366C12.6876 74.842 12.6865 72.4909 13.7958 70.6073C13.7959 70.6071 13.7961 70.6068 13.7962 70.6065L41.1405 23.7084L41.1408 23.7079C42.2484 21.8138 44.2894 20.6483 46.4998 20.6483C48.7102 20.6483 50.7512 21.8137 51.8588 23.7079L51.8591 23.7084L79.2042 70.5954L79.2726 76.6197ZM79.2726 76.6197V76.6048M79.2726 76.6197V76.6048M79.2726 76.6048C80.3125 74.7423 80.2887 72.4503 79.2045 70.5959L79.2726 76.6048ZM53.2806 22.9038L53.2806 22.9038L80.626 69.7913C82.0148 72.1729 82.0148 75.1455 80.626 77.5271C79.2368 79.9094 76.6412 81.3988 73.8452 81.3988H19.1544C16.3584 81.3988 13.7628 79.9094 12.3736 77.5271C10.9848 75.1455 10.9848 72.1728 12.3736 69.7913L39.719 22.9038L39.719 22.9038C41.1082 20.5215 43.7038 19.0321 46.4998 19.0321C49.2958 19.0321 51.8915 20.5216 53.2806 22.9038Z"
                        fill="#D60000"
                        stroke="#D60000"
                      />
                      <path
                        d="M76.487 72.1559L76.0551 72.4079C76.5055 73.1801 76.5059 74.1374 76.0564 74.91C75.5907 75.6876 74.7496 76.1682 73.845 76.1682H19.1542C18.2476 76.1682 17.4087 75.6862 16.9573 74.9122C16.5064 74.1392 16.5064 73.1808 16.9573 72.4079L16.5254 72.1559L16.9573 72.4078L44.3026 25.5204C44.7547 24.7454 45.581 24.2644 46.4996 24.2644C47.4206 24.2644 48.2589 24.7474 48.7097 25.5204L76.0551 72.4078L76.487 72.1559ZM74.6243 74.1132L74.6882 73.9992V73.9625C74.7242 73.86 74.7378 73.7567 74.7378 73.6647C74.7378 73.5218 74.7052 73.3631 74.6243 73.2189L74.6243 73.2189L74.6201 73.2117L47.2748 26.3242L47.2703 26.3166L47.2656 26.3092C47.1833 26.1788 47.0674 26.0773 46.9495 26.0079C46.8319 25.9387 46.6756 25.88 46.4994 25.88C46.2019 25.88 45.8843 26.0426 45.7224 26.327L18.3819 73.2187C18.2915 73.3665 18.261 73.5296 18.261 73.6674C18.261 73.8104 18.2936 73.969 18.3745 74.1132C18.5356 74.4004 18.855 74.5647 19.154 74.5647H73.8448C74.1438 74.5647 74.4631 74.4004 74.6243 74.1132Z"
                        fill="#D60000"
                        stroke="#EA4335"
                      />
                      <path
                        d="M43.0371 40.9232C43.0371 39.0461 44.5919 37.4996 46.5002 37.4996C48.4084 37.4996 49.9632 39.0461 49.9632 40.9232V55.3102C49.9632 57.1873 48.4084 58.7338 46.5002 58.7338C44.5919 58.7338 43.0371 57.1873 43.0371 55.3102V40.9232ZM46.5002 57.1176C47.4982 57.1176 48.3212 56.3099 48.3212 55.3098V40.9228C48.3212 39.9226 47.4982 39.1149 46.5002 39.1149C45.5022 39.1149 44.6792 39.9226 44.6792 40.9228V55.3098C44.6792 56.3099 45.5022 57.1176 46.5002 57.1176Z"
                        fill="#D60000"
                        stroke="#EA4335"
                      />
                      <path
                        d="M43.0371 65.7731C43.0371 63.896 44.5919 62.3495 46.5002 62.3495C48.4084 62.3495 49.9632 63.896 49.9632 65.7731C49.9632 67.6502 48.4084 69.1967 46.5002 69.1967C44.5919 69.1967 43.0371 67.6502 43.0371 65.7731ZM44.6792 65.7731C44.6792 66.7733 45.5022 67.581 46.5002 67.581C47.4982 67.581 48.3212 66.7733 48.3212 65.7731C48.3212 64.7729 47.4982 63.9652 46.5002 63.9652C45.5022 63.9652 44.6792 64.7729 44.6792 65.7731Z"
                        fill="#D60000"
                        stroke="#EA4335"
                      />
                      <path
                        d="M23.6984 39.0272C24.425 38.9487 24.9402 38.2948 24.8609 37.5885L23.6683 38.5272M23.6984 39.0272V38.5272H23.6683M23.6984 39.0272H23.5531C22.8926 39.0272 22.3245 38.5302 22.2453 37.8632L23.6984 39.0272ZM23.6683 38.5272C24.107 38.4671 24.4116 38.0677 24.3641 37.6443L24.3639 37.6433C23.9766 34.1351 26.5299 30.9738 30.0649 30.5913L30.065 30.5913C30.5162 30.5425 30.8327 30.1364 30.7843 29.7055L30.7841 29.7044C30.7352 29.2601 30.3247 28.9391 29.8916 28.9947L29.8823 28.9959L29.8823 28.9958C27.7405 29.23 25.8134 30.2766 24.4569 31.9522L24.4518 31.9489C23.109 33.6195 22.5075 35.6867 22.742 37.8059C22.792 38.2191 23.1451 38.5272 23.5531 38.5272H23.6683Z"
                        fill="#D60000"
                        stroke="#D60000"
                      />
                      <path
                        d="M15.6802 39.3898H15.536C15.1916 39.3273 14.9129 39.045 14.869 38.6813C13.897 30.0025 20.2332 22.1519 29.011 21.1877L29.011 21.1877L29.0201 21.1866C29.4531 21.131 29.8636 21.452 29.9126 21.8963L29.9127 21.8974C29.9611 22.3283 29.6447 22.7344 29.1934 22.7832L29.1924 22.7833C25.3764 23.2031 21.9536 25.073 19.5584 28.0403C17.1491 31.0084 16.0667 34.7253 16.4911 38.5069L16.4911 38.5069C16.5387 38.9303 16.2341 39.3297 15.7954 39.3898H15.6802Z"
                        fill="#D60000"
                        stroke="#D60000"
                      />
                      <path
                        d="M70.2574 37.7944L70.2575 37.7944C70.4936 35.6779 69.8855 33.5877 68.5295 31.9127C67.1727 30.2367 65.2587 29.1906 63.1046 28.9563C62.6451 28.9068 62.2506 29.2268 62.2023 29.665C62.1535 30.1074 62.4679 30.5028 62.9215 30.5518L63.1915 30.581L63.2078 30.6132C66.6002 31.1247 69.0129 34.2126 68.6357 37.6299L70.2574 37.7944ZM70.2574 37.7944L70.2568 37.8006M70.2574 37.7944L70.2568 37.8006M70.2568 37.8006C70.2174 38.1986 69.8635 38.5138 69.4465 38.5138H69.3312M70.2568 37.8006L69.3312 38.5138M69.3312 38.5138C68.8905 38.4538 68.5879 38.0646 68.6357 37.63L69.3312 38.5138Z"
                        fill="#D60000"
                        stroke="#EA4335"
                      />
                      <path
                        d="M63.7526 23.2671C67.4383 23.6726 70.7408 25.4774 73.0526 28.3417C75.3644 31.2059 76.4212 34.7894 76.0117 38.438C75.9324 39.1573 76.4476 39.7982 77.1742 39.8767H77.3195C77.98 39.8767 78.5613 39.3797 78.6273 38.7127C79.6313 29.7539 73.0922 21.6581 64.0432 20.6645C63.3299 20.586 62.6694 21.0961 62.5901 21.8154C62.5108 22.5348 63.026 23.1756 63.7526 23.2541L63.7526 23.2671Z"
                        fill="#D60000"
                      />
                    </svg>

                    <div className="emergency-title">
                    <h4>Emergency Occurence</h4>
                  </div>
                  </div>
                 
                  <div className="emergency-body">
                    <p><span className="font-weight-400">Caregiver :</span> {caregiverEmergency?.firstName} {caregiverEmergency?.lastName} </p>
                    <p><span className="font-weight-400">Location :</span> {caregiverEmergency?.location}</p>
                    <p><span className="font-weight-400">Time :</span> {caregiverEmergency?.time}</p>
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
