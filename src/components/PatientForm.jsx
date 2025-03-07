import React from "react";
import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { createDocument, getDocuments, updateDocument } from "../services/api";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const steps = [
  "Personal Details",
  "Medical Details",
  "Caregiver Assignment",
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
  const token = localStorage.getItem('token');

  const [activeStep, setActiveStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(openForm);

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "john",
    lastName: "doe",
    email: "johndoe@gmail.com",
    phoneNumber: "987654321",
    medicalConditions: ["hypertension", "diabetes"],
    medications: ["saridon"],
    caregiverAssigned: "8977662",
    emergencyContact: { name: "jenny", relation: "sister", phone: "997788822" },
    insuranceDetails: { provider: "jason", policyNumber: "jl112" },
    admissionDate: "20-10-2025",
    dischargeDate: "25-10-2025",
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
      setIsUpdate(true);
    } else {
      setIsModalOpen(null); // Close modal when isEdit is false
    }
  }, [isEdit]); //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    const result = await createDocument("patients", formData, token);
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

    const updatedData = {
      ...formData,
    };
    console.log("Patient Data Updates:", updatedData);
    // console.log("Caregiver Data Updates:", singleCaregiverData.id);
    try {
      await updateDocument("patients", updatedData.id, updatedData, token);
      console.log("Patient updated successfully");
      closeModal()
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
                </>
              )}

              {/* Step 3: Caregiver Assignment */}
              {activeStep === 2 && (
                <TextField
                  label="Caregiver Assigned (ID)"
                  name="caregiverAssigned"
                  fullWidth
                  margin="normal"
                  value={formData.caregiverAssigned}
                  onChange={handleChange}
                  required
                />
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
                    select
                    fullWidth
                    margin="normal"
                    value={formData.emergencyContact.relation}
                    onChange={(e) => handleNestedChange(e, "emergencyContact")}
                  >
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Spouse">Spouse</MenuItem>
                    <MenuItem value="Sibling">Sibling</MenuItem>
                    <MenuItem value="Daughter">Daughter</MenuItem>
                    <MenuItem value="Son">Son</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
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
                  <h3>Review Details</h3>
                  <pre>{JSON.stringify(formData, null, 2)}</pre>
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
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                (!isUpdate ? <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button> :
                <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>) 
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default PatientForm;
