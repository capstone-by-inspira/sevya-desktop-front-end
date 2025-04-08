import { useState, useEffect } from "react";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signup, updateDocument, uploadImage } from "../services/api";
import Modal from "../components/Modal";
import anonymous from "../assets/anonymousimage.png";
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
import toast, { Toaster } from "react-hot-toast";
import SevyaLoader from '../components/SevyaLoader';

const steps = [
  "Personal Info",
  "Availability",
  "Profile Image",
  "Review & Submit",
];

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

  const [loading, setLoading] = useState(false); // Add loading state

  const [caregiverData, setCaregiverData] = useState({
    firstName: "Carla",
    lastName: "dos Santos",
    password: "",
    email: "carla.santos@gmail.com",
    age: "32",
    gender: "Female",
    phoneNumber: "4161234567",
    licenseNumber: "LX84756",
    address: "Toronto, Canada",
    specialization: "Mental Health Care",
    experienceYears: "7",
    availability: [],
    collectionName: "caregivers",
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
    setLoading(true);
    e.preventDefault();
    console.log("Caregiver Data Submitted:", caregiverData);
    try {
      let updatedCaregiverData = {
        ...caregiverData,
        availability: selectedDates,
      };

      // Create caregiver (with or without image)
      console.log(updatedCaregiverData, 'updatedCaregiverData');
      await signup(updatedCaregiverData);
      console.log("Caregiver account created successfully");
      setLoading(false);

      closeModal();
      toast.success("Caregiver created successfully !");

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
      toast.success("Caregiver updated successfully !");

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
    console.log(
      file,
      "uploadddlcnklnclancslnalcnsklcnlkcnaklnlascnlnacsnlacsnlkcasl"
    );
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

    setSelectedDates((prevDates = []) => {
      // Ensure prevDates is always an array
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
                    label="Age"
                    name="age"
                    value={caregiverData.age}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />

                  <TextField
                    label="Gender"
                    name="gender"
                    value={caregiverData.gender}
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
                    value={selectedDates?.map(
                      (date) => new Date(date + "T00:00:00")
                    )} // Ensure local midnight time
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
                  {/* <div>
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
                  </div> */}

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
                <>
                  <div className="reviw-card">
                    <h3>Review Information</h3>
                    <div className="sevya-card">
                      <div className="sevya-card-inner">
                        <div className="sevya-card-front">
                          <div className="sevya-card-content">
                            <div className="sevya-card-header">
                              <div>
                                {caregiverData?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  caregiverData?.firstName.slice(1) ||
                                  "N.A."}{" "}
                                {" "}
                                (
                                {caregiverData?.gender.charAt(0).toUpperCase() +
                                  caregiverData?.gender.slice(1) || "N.A."}{" "}
                                )
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
                                    caregiverData.image
                                      ? caregiverData.image
                                      : anonymous
                                  }
                                  alt="Profile Picture"
                                />
                              </div>

                              <div className="sevya-card-user-content">
                                <p>
                                  <strong>First Name : </strong> {" "}
                                  {caregiverData?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  caregiverData?.firstName.slice(1) ||
                                  "N.A."}{" "}
                                </p>
                                <p>
                                  <strong>Last Name : </strong> {" "}
                                  {caregiverData?.lastName
                                  .charAt(0)
                                  .toUpperCase() +
                                  caregiverData?.lastName.slice(1) ||
                                  "N.A."}{" "}
                                </p>
                                <p>
                                  <strong>Age: </strong> {caregiverData.age}
                                </p>
                                <p>
                                  <strong>Email: </strong> {caregiverData.email}
                                </p>
                                <p>
                                  <strong>Phone: </strong>{" "}
                                  {caregiverData.phoneNumber}
                                </p>

                               
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sevya-card-back">
                          <div className="sevya-card-content">
                            <div className="sevya-card-header">
                              <div>
                                {caregiverData?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  caregiverData?.firstName.slice(1) ||
                                  "N.A."}{" "}
                                {" "}
                                (
                                {caregiverData?.gender.charAt(0).toUpperCase() +
                                  caregiverData?.gender.slice(1) || "N.A."}{" "}
                                )
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
                                  <strong>Address: </strong>{" "}
                                  {caregiverData.address}
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
                                  <strong>Experience:</strong>{" "}
                                  {caregiverData.experienceYears} years
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
            </div>
            <div className="modal-form-footer">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                !isUpdate ? (
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
                )
              ) : (
                <button className="sevya-button" onClick={handleNext}>
                  Next
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

export default CaregiverForm;
