import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
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
const CaregiverForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [caregiverData, setCaregiverData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    specialization: "",
    experienceYears: "",
    availability: [],
    collectionName:"caregiver"
  });

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

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  // const handleSubmit = () => {
  //     console.log("Caregiver Data Submitted:", caregiverData);
  //   //  handleSubmitSignUp();
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Caregiver Data Submitted:", caregiverData);

    try {
      await signup(
        caregiverData
      );
      console.log("Caregiver account created successfully");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <Modal
      buttonId="addCaregiver "
      buttonLabel="Add New Caregiver"
      modalHeaderTitle="New Caregiver Detail"
      modalBodyHeader="Add detail over here"
      modalBodyContent={
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div style={{ marginTop: 20 }}>
            {activeStep === 0 && (
              <div>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="Password"
                  name="password"
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

                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="License Number"
                  name="licenseNumber"
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
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  label="Years of Experience"
                  name="experienceYears"
                  type="number"
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
                  <strong>License Number:</strong> {caregiverData.licenseNumber}
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

            <div style={{ marginTop: 20 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
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
        </div>
      }
      saveDataAndOpenName="Save"
      saveDataAndOpenId="save"
      saveDataAndOpenFunction={() => handleSubmit()}
      closeButtonID="closeSheet"
      closeButtonName="Close"
      buttonAlign="row"
      onModalClose={() => console.log("Modal 1 closed")}
      closeModalAfterDataSend="true"
    />
  );
};

export default CaregiverForm;
