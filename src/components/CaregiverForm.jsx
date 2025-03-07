import { useState, useEffect } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signup, updateDocument } from "../services/api";
import Modal from "../components/Modal";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const steps = ["Personal Info", "Availability", "Documents", "Review & Submit"];

const API_URL = "http://localhost:8800/api";
const CaregiverForm = ({
  singleCaregiverData,
  refreshData,
  openForm,
  closeForm,
  isEdit
}) => {
  const token = localStorage.getItem('token');

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(openForm);

  const [isUpdate, setIsUpdate] = useState(false);
  const [caregiverData, setCaregiverData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    specialization: "",
    experienceYears: "",
    availability: [""],
    collectionName: "",
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
      setCaregiverData(singleCaregiverData[0]);
      setIsUpdate(true);
    } else {
      setIsModalOpen(null); // Close modal when isEdit is false
    }
  }, [isEdit]); //

  const handleChange = (e) => {
    setCaregiverData({ ...caregiverData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setCaregiverData({ ...caregiverData, certifications: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Caregiver Data Submitted:", caregiverData);
    try {
      await signup(caregiverData);
      console.log("Caregiver account created successfully");
      closeModal();
      refreshData();
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      ...caregiverData,
    }
    console.log("Caregiver Data Updates:", updatedData);
    // console.log("Caregiver Data Updates:", singleCaregiverData.id);
    try {
      await updateDocument('caregivers', updatedData.id , updatedData, token);
      console.log("Caregiver updated successfully");
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHeaderTitle="New Caregiver Detail"
        modalBodyHeader="Add detail over here"
        modalBodyContent={
          <div className="modal-form">
            <div className="modal-form-header">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>

            <div className="modal-form-body">
              {activeStep === 0 && (
                <div>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={caregiverData.firstName}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={caregiverData.lastName}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                {!isUpdate ? <TextField
                    label="Email"
                    name="email"
                    value={caregiverData.email}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  /> : "" }
             {!isUpdate ?  <TextField
                    label="Password"
                    name="password"
                    value={caregiverData.password}
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordToggle} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  : ""}

                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={caregiverData.phoneNumber}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="License Number"
                    name="licenseNumber"
                    value={caregiverData.licenseNumber}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <TextField
                    label="Specialization"
                    name="specialization"
                    value={caregiverData.specialization}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Years of Experience"
                    name="experienceYears"
                    type="number"
                    value={caregiverData.experienceYears}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <TextField
                    label="Document URLs (comma-separated)"
                    name="documents"
                    value={caregiverData.documents}
                    fullWidth
                    margin="normal"
                    onChange={(e) =>
                      setCaregiverData({
                        ...caregiverData,
                        documents: e.target.value.split(","),
                      })
                    }
                  />
                </div>
              )}

              {activeStep === 3 && (
                <div>
                  <h3>Review Information</h3>
                  <p>
                    <strong>Name:</strong> {caregiverData.firstName}{" "}
                    {caregiverData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {caregiverData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {caregiverData.phoneNumber}
                  </p>
                  <p>
                    <strong>License Number:</strong>{" "}
                    {caregiverData.licenseNumber}
                  </p>
                  <p>
                    <strong>Specialization:</strong>{" "}
                    {caregiverData.specialization}
                  </p>
                  <p>
                    <strong>Experience:</strong> {caregiverData.experienceYears}{" "}
                    years
                  </p>
                </div>
              )}
            </div>
            <div className="modal-form-footer">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
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
               
              ) : (
 
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
               
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default CaregiverForm;
