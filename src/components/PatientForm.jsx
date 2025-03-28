import React from "react";
import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { formatTimestamp } from "../services/utils";
import {
  createDocument,
  getDocuments,
  updateDocument,
  uploadImage,
} from "../services/api";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

  const [activeStep, setActiveStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(openForm);

  const [isUpdate, setIsUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [dateTime, setDateTime] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "john",
    lastName: "doe",
    age: "",
    gender: "Male",
    email: "johndoe@gmail.com",
    phoneNumber: "987654321",
    address: "123 main st",
    medicalConditions: ["hypertension", "diabetes"],
    medications: ["saridon"],
    emergencyContact: { name: "jenny", relation: "sister", phone: "997788822" },
    insuranceDetails: { provider: "jason", policyNumber: "jl112" },
    admissionDate: dayjs(),
    dischargeDate: dayjs(),
    image: "",
    shifts: {},
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

                  {fileUpload && <p className="image-uploaded">Image uploaded successfully!</p>}
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
                <div>
                  <h3>Review Information</h3>

                  <div className="review-form-image">
                    <img src={formData.image} alt="" />
                  </div>

                  <p>
                    <strong>Name:</strong> {formData.firstName}{" "}
                    {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phoneNumber}
                  </p>

                  <p>
                    <strong>Address:</strong> {formData.address}
                  </p>

                  <hr />

                  <p>
                    <strong>Medical Condition:</strong>{" "}
                    {formData.medicalConditions.join(" , ")}
                  </p>

                  <p>
                    <strong>Medications:</strong>{" "}
                    {formData.medications.join(" , ")}
                  </p>

                  <hr />

                  <p>
                    <strong>Insurance Detail Provide:</strong>{" "}
                    {formData.insuranceDetails.provider}
                  </p>
                  <p>
                    <strong>Insurance Detail Number:</strong>{" "}
                    {formData.insuranceDetails.policyNumber}
                  </p>

                  <hr />

                  <p>
                    <strong>Emergency Contact Name:</strong>{" "}
                    {formData.emergencyContact.name}
                  </p>
                  <p>
                    <strong>Emergency Contact Relation:</strong>{" "}
                    {formData.emergencyContact.relation}
                  </p>
                  <p>
                    <strong>Emergency Contact Phone:</strong>{" "}
                    {formData.emergencyContact.phone}
                  </p>

                  <hr />
                  <p>
                    <strong>Admission Date:</strong>
                    {formatTimestamp(formData.admissionDate)}
                  </p>
                  <p>
                    <strong>Discharge Date:</strong> {formatTimestamp(formData.dischargeDate)}
                  </p>
                </div>
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
                </button>
              ) : (
                <button className="sevya-button" onClick={handleUpdate}>
                  Update
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
