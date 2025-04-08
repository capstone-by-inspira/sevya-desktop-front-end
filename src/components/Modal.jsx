import React, { useState, useEffect } from "react";
import SevyaLoader from "../components/SevyaLoader";

const Modal = ({
  modalHeaderTitle = "",
  modalBodyHeader = "",
  modalBodyContent = "",
  isOpen,
  closeModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const close = () => {
    setIsModalOpen(false);
    closeModal();
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
 

        <div className="modal-background">

       
          <div className="modal-sevya">

          
            <div className="modal-header">
              <div className="modal-header-title">
                <h4>{modalHeaderTitle}</h4>
                <i className="fa-solid fa-xmark close" onClick={close}></i>
              </div>
            </div>

            <div className="modal-body">
              <h5 className="modal-body-header">{modalBodyHeader}</h5>
              <>{modalBodyContent}</>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
