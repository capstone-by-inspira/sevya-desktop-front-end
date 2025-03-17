import { useState, useEffect } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signup, updateDocument, uploadImage } from "../services/api";
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
import ImageUploader from "./FileUploader";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // You can style the calendar according to your needs

const steps = ["Personal Info", "Availability", "Documents", "Review & Submit"];

const CaregiverForm = ({
  singleCaregiverData,
  refreshData,
  openForm,
  closeForm,
  isEdit,
}) => {
  const token = localStorage.getItem("token");

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(openForm);

  const [isUpdate, setIsUpdate] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [selectedDates, setSelectedDates] = useState([]);

  const [caregiverData, setCaregiverData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    address: "",
    specialization: "",
    experienceYears: "",
    availability: [],
    collectionName: "",
    image: "",
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
      setSelectedDates(singleCaregiverData[0].availability);
      setIsUpdate(true);
    } else {
      setIsModalOpen(null); // Close modal when isEdit is false
    }
  }, [isEdit]); //

  const handleChange = (e) => {
    setCaregiverData({ ...caregiverData, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Caregiver Data Submitted:", caregiverData);
    try {
      let updatedCaregiverData = {
        ...caregiverData,
        availability: selectedDates,
      };

      // Create caregiver (with or without image)
      await signup(updatedCaregiverData);
      console.log("Caregiver account created successfully");
      closeModal();
      refreshData();
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Caregiver Data Updates:", caregiverData);
    try {
      let updatedCaregiverData = {
        ...caregiverData,
        availability: selectedDates,
      };

      // Update caregiver (with or without image)
      await updateDocument(
        "caregivers",
        updatedCaregiverData.id,
        updatedCaregiverData,
        token
      );
      console.log("Caregiver updated successfully");
      closeModal();
      refreshData();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(null);
    closeForm();
    console.log("trigger hoia");
  };

  // file upload >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileUpload(file);
    const uploadedImageUrl = await uploadImage(file);
    if (uploadedImageUrl.success) {
      const updatedData = {
        ...caregiverData,
        image: uploadedImageUrl.imageUrl,
      };
      setCaregiverData(updatedData);
    } else {
      console.error("Image upload failed");
    }
  };


  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // 'en-CA' returns YYYY-MM-DD

    // Avoid mutating the state directly. Use the functional setState.
  
    setSelectedDates((prevDates = []) => {  // Ensure prevDates is always an array
      if (!prevDates.includes(formattedDate)) {
        return [...prevDates, formattedDate]; // Add the new date
      }
      return prevDates; // Return previous dates if date is already present
    });
  };

  // Remove selected date
  const handleRemoveDate = (date) => {
    setSelectedDates((prevDates) => prevDates.filter((d) => d !== date));
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
                  {!isUpdate ? (
                    <TextField
                      label="Email"
                      name="email"
                      value={caregiverData.email}
                      fullWidth
                      margin="normal"
                      onChange={handleChange}
                    />
                  ) : (
                    ""
                  )}
                  {!isUpdate ? (
                    <TextField
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
                            <IconButton
                              onClick={handlePasswordToggle}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    ""
                  )}

                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={caregiverData.phoneNumber}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Address"
                    name="address"
                    value={caregiverData.address}
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

              {activeStep === 1 && (
                <div className="availability-calendar">
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDates?.map((date) => new Date(date + 'T00:00:00'))} // Ensure local midnight time
                    selectRange={false}
                  />
                  {selectedDates?.length > 0 ? (
                    <ul>
                      <h5>Availibility</h5>
                      <br />
                      {selectedDates.map((date, index) => (
                        <li key={index} className="dates-list">
                          <span>{date}</span>
                          <i
                            className="fa-solid fa-xmark close"
                            onClick={() => handleRemoveDate(date)}
                          ></i>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No availability selected.</p>
                  )}
                </div>
              )}

              {activeStep === 2 && (
                <>
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

                  {/* Display selected dates as a list */}

                  <div>
                    <h2>Upload Profile Picture</h2>
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

                    {fileUpload && <p>Image uploaded successfully!</p>}
                  </div>
                </>
              )}

              {activeStep === 3 && (
                <div>
                  <h3>Review Information</h3>

                  <div className="review-form-image">
                    <img src={caregiverData.image} alt="" />
                  </div>

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
                    <strong>Address:</strong> {caregiverData.address}
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
                !isUpdate ? (
                  <button className="sevya-button" onClick={handleSubmit}>
                    Submit
                  </button>
                ) : (
                  <button className="sevya-button" onClick={handleUpdate}>
                    Update
                  </button>
                )
              ) : (
                <button className="sevya-button" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default CaregiverForm;
