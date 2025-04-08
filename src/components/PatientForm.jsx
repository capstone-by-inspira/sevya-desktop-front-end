import React from "react";
import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { formatDateOnly, formatTimestamp } from "../services/utils";
import {
  createDocument,
  getDocuments,
  updateDocument,
  uploadImage,
} from "../services/api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import anonymous from "../assets/anonymousimage.png";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";

const steps = [
  "Personal Details",
  "Medical Details",
  "Profile Image",
  "Emergency Contact",
  "Insurance Details",
  "Review & Submit",
];

const PatientForm = ({
  refreshData,
  singlePatientData,
  openForm,
  closeForm,
  isEdit,
}) => {
  const token = localStorage.getItem("token");

  const [activeStep, setActiveStep] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(openForm);

  const [isUpdate, setIsUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [dateTime, setDateTime] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "Harpreet",
    lastName: "Singh",
    age: "35",
    gender: "Male",
    email: "harpreet.singh@example.com",
    phoneNumber: "987-654-3210",
    address: "123 Maple Avenue, Toronto, Ontario, Canada",  // Address set to Canada
    medicalConditions: ["Diabetes", "Cholesterol"],
    medications: ["Metformin", "Atorvastatin"],
    emergencyContact: {
      name: "Gurpreet Singh",
      relation: "Brother",
      phone: "987-654-7890",
    },
    insuranceDetails: {
      provider: "Max Bupa",
      policyNumber: "MB-123456",
    },
    admissionDate: dayjs("2025-04-05"),  // Example: Date of admission
    dischargeDate: dayjs("2025-04-15"),  // Example: Planned discharge date
    image: "",  // Empty image field
    shifts: {},  // Empty shifts object
  });
  
  
  
  

  useEffect(() => {
    if (openForm) {
      setIsModalOpen(true); // Open modal when isEdit is true
      setIsUpdate(false);
    } else {
      setIsModalOpen(null); // Close modal when isEdit is false
    }
  }, [openForm]); //

  useEffect(() => {
    if (isEdit) {
      setIsModalOpen(true); // Open modal when isEdit is true
      setFormData(singlePatientData[0]);
      setFileUpload("");
      setIsUpdate(true);
    } else {
      setIsModalOpen(null); // Close modal when isEdit is false
    }
  }, [isEdit]); //

  const handleChange = (e, fieldName) => {
    if (e.target) {
      const { name, value } = e.target;

      // Handle changes for regular fields (text fields)
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (e && e.isValid) {
      // Handle DateTimePicker changes separately (e is the date object for DateTimePicker)
      setFormData({
        ...formData,
        [fieldName]: e, // Store the selected dayjs object for DateTimePicker fields
      });
    } else {
      console.error("Event target is undefined, cannot process change.");
    }
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: { ...formData[parentKey], [name]: value },
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      console.log("Patient added:", sheetName);
      setModalActive(false); // Close modal after submission
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    console.log("Submitted Data:", token);

    let createData = { ...formData };

    // if (fileUpload) {
    //   const uploadedImageUrl = await uploadImage(fileUpload);
    //   if (uploadedImageUrl.success) {
    //     updatedFormData = {
    //       ...updatedFormData,
    //       image: uploadedImageUrl.imageUrl,
    //     };
    //   } else {
    //     console.error("Image upload failed");
    //   }
    // }

    const result = await createDocument("patients", createData, token);

    if (result.success) {
      console.log("document created");
      closeModal();
      refreshData();
    } else {
      console.error(result.error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedData = {
      ...formData,
    };

    // if (fileUpload) {
    //   const uploadedImageUrl = await uploadImage(fileUpload);
    //   if (uploadedImageUrl.success) {
    //     updatedData = {
    //       ...updatedData,
    //       image: uploadedImageUrl.imageUrl,
    //     };
    //   } else {
    //     console.error("Image upload failed");
    //   }
    // }
    console.log("Patient Data Updates:", updatedData);
    try {
      await updateDocument("patients", updatedData.id, updatedData, token);
      console.log("Patient updated successfully");
      closeModal();
      refreshData();
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(null);
    closeForm();
    console.log("trigger hoia");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileUpload(file);
    const uploadedImageUrl = await uploadImage(file);
    if (uploadedImageUrl.success) {
      const updatedData = {
        ...formData,
        image: uploadedImageUrl.imageUrl,
      };
      setFormData(updatedData);
    } else {
      console.error("Image upload failed");
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHeaderTitle="New Patient Detail"
        modalBodyHeader="Add patient details over here"
        modalBodyContent={
          <div className="modal-form">
            <div className="modal-form-header">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="modal-form-body">
              {/* Step 1: Personal Details */}
              {activeStep === 0 && (
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    fullWidth
                    margin="normal"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    margin="normal"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Age"
                    name="age"
                    fullWidth
                    margin="normal"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Gender"
                    name="gender"
                    fullWidth
                    margin="normal"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                    margin="normal"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Address"
                    name="address"
                    fullWidth
                    margin="normal"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              {/* Step 2: Medical Details */}
              {activeStep === 1 && (
                <>
                  <TextField
                    label="Medical Conditions (comma-separated)"
                    name="medicalConditions"
                    fullWidth
                    margin="normal"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalConditions: e.target.value.split(","),
                      })
                    }
                  />
                  <TextField
                    label="Medications (comma-separated)"
                    name="medications"
                    fullWidth
                    margin="normal"
                    value={formData.medications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medications: e.target.value.split(","),
                      })
                    }
                  />
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      className="date-time-patient"
                      label="Admission Date"
                      value={dayjs(formData.admissionDate)}
                      onChange={(newValue) =>
                        handleChange(newValue, "admissionDate")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      className="date-time-patient"
                      fullWidth
                      label="Discharge Date"
                      value={dayjs(formData.dischargeDate)}
                      onChange={(newValue) =>
                        handleChange(newValue, "dischargeDate")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  {/* <input
                    label="Admission Date"
                    type="datetime-local"
                    name="admissionDate"
                    id="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                  />

                  <input
                    label="Discharge Date"
                    type="datetime-local"
                    name="dischargeDate"
                    id="dischargeDate"
                    value={formData.dischargeDate}
                    onChange={handleChange}
                  /> */}
                </>
              )}

              {/* Step 3: Caregiver Assignment */}
              {activeStep === 2 && (
                <div className="sevya-file-uplaod">
                  <form className="file-upload-form">
                    <label htmlFor="file" className="file-upload-label">
                      <div className="file-upload-design">
                        <svg viewBox="0 0 640 512" height="1em">
                          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                        </svg>
                        <p>Drag and Drop Profile Picture</p>
                        <span className="browse-button">Browse file</span>
                      </div>
                      <input
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </form>

                  {fileUpload && (
                    <p className="image-uploaded">
                      Image uploaded successfully!
                    </p>
                  )}
                </div>
              )}

              {/* Step 4: Emergency Contact */}
              {activeStep === 3 && (
                <>
                  <TextField
                    label="Emergency Contact Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleNestedChange(e, "emergencyContact")}
                    required
                  />

                  <TextField
                    label="Relation"
                    name="relation"
                    fullWidth
                    margin="normal"
                    value={formData.emergencyContact.relation}
                    onChange={(e) => handleNestedChange(e, "emergencyContact")}
                    required
                  />

                  <TextField
                    label="Emergency Contact Phone"
                    name="phone"
                    fullWidth
                    margin="normal"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleNestedChange(e, "emergencyContact")}
                  />
                </>
              )}

              {/* Step 5: Insurance Details */}
              {activeStep === 4 && (
                <>
                  <TextField
                    label="Insurance Provider"
                    name="provider"
                    fullWidth
                    margin="normal"
                    value={formData.insuranceDetails.provider}
                    onChange={(e) => handleNestedChange(e, "insuranceDetails")}
                    required
                  />
                  <TextField
                    label="Policy Number"
                    name="policyNumber"
                    fullWidth
                    margin="normal"
                    value={formData.insuranceDetails.policyNumber}
                    onChange={(e) => handleNestedChange(e, "insuranceDetails")}
                    required
                  />
                </>
              )}

              {/* Step 6: Review & Submit */}
              {activeStep === 5 && (
                <>
                  <div className="reviw-card">
                    <h3>Review Information</h3>
                    <div className="sevya-card">
                      <div className="sevya-card-inner">
                        <div className="sevya-card-front">
                          <div className="sevya-card-content">
                            <div className="sevya-card-header">
                            <div>
                                {formData?.firstName.charAt(0).toUpperCase() +
                                  formData?.firstName.slice(1) || "N.A."}{" "}
                                  {formData?.lastName.charAt(0).toUpperCase() +
                                  formData?.lastName.slice(1) || "N.A."}{" "}
                                ({formData?.gender.charAt(0).toUpperCase() +
                                  formData?.gender.slice(1) || "N.A."}{" "})
                              </div>
                              <div className="logo">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 146 146"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100.823 47.6661C100.823 49.9437 100.172 52.0695 99.0481 53.8682C96.9784 57.176 93.3062 59.3742 89.1178 59.3742C85.7586 59.3742 82.7312 57.9586 80.5937 55.6926C78.6222 53.5972 77.4121 50.773 77.4121 47.6661C77.4121 46.8462 77.4962 46.0473 77.6574 45.2764C78.76 39.9573 83.4717 35.9604 89.1178 35.9604C93.937 35.9604 98.0764 38.8734 99.8681 43.0339C100.485 44.4541 100.823 46.0216 100.823 47.6661Z"
                                    fill="#3ADDC1"
                                  />
                                  <path
                                    d="M107.117 80.5897L105.65 82.059L73.1211 114.588V100.712L98.712 75.1211L100.181 73.6541C105.356 68.4775 105.356 60.0562 100.179 54.8797C99.8192 54.5199 99.4408 54.1812 99.0484 53.8682C100.172 52.0695 100.824 49.9437 100.824 47.6661C100.824 46.0216 100.485 44.4541 99.8683 43.0338C102.503 44.1551 104.968 45.7926 107.117 47.9417C116.134 56.9587 116.134 71.5751 107.117 80.5897Z"
                                    fill="#3ADDC1"
                                  />
                                  <path
                                    d="M73.1215 0V16.0764C104.503 16.1418 129.924 41.6018 129.924 73C129.924 104.398 104.503 129.856 73.1215 129.921V146C113.382 145.935 146 113.277 146 73C146 32.7227 113.382 0.065408 73.1215 0ZM0.121472 77.2235V68.7788C0.039712 70.1758 0 71.582 0 73C0 74.418 0.039712 75.8266 0.121472 77.2235Z"
                                    fill="#77A2C9"
                                  />
                                  <path
                                    d="M16.077 73C16.077 104.438 41.5627 129.921 73.0006 129.921H73.1221V146H73.0006C34.1015 146 2.30857 115.576 0.12207 77.2235V68.7788C2.30857 30.4264 34.1015 0 73.0006 0H73.1221V16.0764H73.0006C41.5627 16.0764 16.077 41.5621 16.077 73Z"
                                    fill="#578FCA"
                                  />
                                  <path
                                    d="M73.1206 100.712V114.588L72.9991 114.709L40.3489 82.0591L38.8819 80.5897C29.8649 71.5751 29.8649 56.9588 38.8819 47.9418C41.031 45.7927 43.4955 44.1551 46.1305 43.0339C47.9222 38.8734 52.0616 35.9604 56.8807 35.9604C62.5269 35.9604 67.2386 39.9573 68.3412 45.2764C68.5023 46.0473 68.5864 46.8462 68.5864 47.6661C68.5864 50.773 67.3764 53.5972 65.4048 55.6926C63.2674 57.9586 60.2399 59.3742 56.8807 59.3742C52.6923 59.3742 49.0201 57.176 46.9504 53.8682C46.558 54.1812 46.1795 54.52 45.8198 54.8797C43.3109 57.3862 41.9303 60.7197 41.9303 64.2658C41.9303 67.8118 43.3109 71.1453 45.8174 73.6541L47.2868 75.1212L72.9991 100.834L73.1206 100.712Z"
                                    fill="#0FBFAE"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="sevya-card-body">
                              <div className="sevya-card-profile">
                                <img
                                  src={
                                    formData.image ? formData.image : anonymous
                                  }
                                  alt=""
                                />
                              </div>

                              <div className="sevya-card-user-content">
                                <p>
                                  <strong>Email: </strong> {" "}{formData.email}
                                </p>
                                <p>
                                  <strong>Phone: </strong>{" "}
                                  {formData.phoneNumber}
                                </p>

                                <p>
                                  <strong>Address: </strong> {formData.address}
                                </p>
                                <p>
                                  <strong>Admission Date: </strong>{" "}
                                  {formatDateOnly(formData.admissionDate)}
                                </p>
                                <p>
                                  <strong>Discharge Date: </strong>{" "}
                                  {formatDateOnly(formData.dischargeDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sevya-card-back">
                          <div className="sevya-card-content">
                            <div className="sevya-card-header">
                              <div>
                                {formData?.firstName.charAt(0).toUpperCase() +
                                  formData?.firstName.slice(1) || "N.A."}{" "}
                                  {formData?.lastName.charAt(0).toUpperCase() +
                                  formData?.lastName.slice(1) || "N.A."}{" "}
                                ({formData?.gender.charAt(0).toUpperCase() +
                                  formData?.gender.slice(1) || "N.A."}{" "})
                              </div>
                              <div className="logo">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 146 146"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100.823 47.6661C100.823 49.9437 100.172 52.0695 99.0481 53.8682C96.9784 57.176 93.3062 59.3742 89.1178 59.3742C85.7586 59.3742 82.7312 57.9586 80.5937 55.6926C78.6222 53.5972 77.4121 50.773 77.4121 47.6661C77.4121 46.8462 77.4962 46.0473 77.6574 45.2764C78.76 39.9573 83.4717 35.9604 89.1178 35.9604C93.937 35.9604 98.0764 38.8734 99.8681 43.0339C100.485 44.4541 100.823 46.0216 100.823 47.6661Z"
                                    fill="#3ADDC1"
                                  />
                                  <path
                                    d="M107.117 80.5897L105.65 82.059L73.1211 114.588V100.712L98.712 75.1211L100.181 73.6541C105.356 68.4775 105.356 60.0562 100.179 54.8797C99.8192 54.5199 99.4408 54.1812 99.0484 53.8682C100.172 52.0695 100.824 49.9437 100.824 47.6661C100.824 46.0216 100.485 44.4541 99.8683 43.0338C102.503 44.1551 104.968 45.7926 107.117 47.9417C116.134 56.9587 116.134 71.5751 107.117 80.5897Z"
                                    fill="#3ADDC1"
                                  />
                                  <path
                                    d="M73.1215 0V16.0764C104.503 16.1418 129.924 41.6018 129.924 73C129.924 104.398 104.503 129.856 73.1215 129.921V146C113.382 145.935 146 113.277 146 73C146 32.7227 113.382 0.065408 73.1215 0ZM0.121472 77.2235V68.7788C0.039712 70.1758 0 71.582 0 73C0 74.418 0.039712 75.8266 0.121472 77.2235Z"
                                    fill="#77A2C9"
                                  />
                                  <path
                                    d="M16.077 73C16.077 104.438 41.5627 129.921 73.0006 129.921H73.1221V146H73.0006C34.1015 146 2.30857 115.576 0.12207 77.2235V68.7788C2.30857 30.4264 34.1015 0 73.0006 0H73.1221V16.0764H73.0006C41.5627 16.0764 16.077 41.5621 16.077 73Z"
                                    fill="#578FCA"
                                  />
                                  <path
                                    d="M73.1206 100.712V114.588L72.9991 114.709L40.3489 82.0591L38.8819 80.5897C29.8649 71.5751 29.8649 56.9588 38.8819 47.9418C41.031 45.7927 43.4955 44.1551 46.1305 43.0339C47.9222 38.8734 52.0616 35.9604 56.8807 35.9604C62.5269 35.9604 67.2386 39.9573 68.3412 45.2764C68.5023 46.0473 68.5864 46.8462 68.5864 47.6661C68.5864 50.773 67.3764 53.5972 65.4048 55.6926C63.2674 57.9586 60.2399 59.3742 56.8807 59.3742C52.6923 59.3742 49.0201 57.176 46.9504 53.8682C46.558 54.1812 46.1795 54.52 45.8198 54.8797C43.3109 57.3862 41.9303 60.7197 41.9303 64.2658C41.9303 67.8118 43.3109 71.1453 45.8174 73.6541L47.2868 75.1212L72.9991 100.834L73.1206 100.712Z"
                                    fill="#0FBFAE"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="sevya-card-body">
                              <div className="sevya-card-user-back-content">
                                <p>
                                  <strong>Medical Condition: </strong>{" "}
                                  {formData.medicalConditions.join(" , ")}
                                </p>

                                <p>
                                  <strong>Medications: </strong>{" "}
                                  {formData.medications.join(" , ")}
                                </p>

                                <p>
                                  <strong>Insurance Detail Provide: </strong>{" "}
                                  {formData.insuranceDetails.provider}
                                </p>
                                <p>
                                  <strong>Insurance Detail Number: </strong>{" "}
                                  {formData.insuranceDetails.policyNumber}
                                </p>

                                <p>
                                  <strong>Emergency Contact Name: </strong>{" "}
                                  {formData.emergencyContact.name} ({" "}
                                  {formData.emergencyContact.relation})
                                </p>

                                <p>
                                  <strong>Emergency Contact Phone:</strong>{" "}
                                  {formData.emergencyContact.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </>
              )}

              {/* Navigation Buttons */}
            </div>
            <hr />
            <div className="modal-form-footer">
              {activeStep > 0 && (
                <Button onClick={handleBack} style={{ marginRight: "10px" }}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <button className="sevya-button" onClick={handleNext}>
                  Next
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              ) : !isUpdate ? (
                <button className="sevya-button" onClick={handleSubmit}>
                  Submit
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              ) : (
                <button className="sevya-button" onClick={handleUpdate}>
                  Update
                  <div class="arrow-wrapper">
                    <div class="arrow"></div>
                  </div>
                </button>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default PatientForm;
