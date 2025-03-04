import React from "react";
import '../components/css/AddCaregiver.css'


const AddCaregiver = () => {

  return (
    <form>
        <h2>Wellcome, Sarah</h2>
        <p>Add a Caregiver</p>
        <div className="AddCaregiver1">
            <label>Caregiver name</label>
            <input type="text" name="name" placeholder="Caregiver name" />
            <label>Age</label>
            <input type="text" name="age" placeholder="Age" />
            <label>Gender</label>
            <input type="text" name="gender" placeholder="Gender" />
            <label>Address</label>
            <input type="text" name="address" placeholder="Address" />
            <label>Emergency Contact</label>
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" />
            <label>E-mail</label> 
            <input type="email" placeholder="Email" required />
            <label>Graduation</label>        
            <input type="text" name="graduation" placeholder="Graduation" />
            <label>Educational Institution</label>        
            <input type="text" name="institution" placeholder="Institution" />
        </div>

        <div>
            <p>Specialization:</p>
            <div>
                <div className="radio-container">
                    <input type="radio" id="childCare" name="serviceType" value="childCare" className="radio-input" />
                    <label htmlFor="childCare" className="radio-label">Child Care</label>
                </div>
                <div className="radio-container">
                    <input type="radio" id="elderlyCare" name="serviceType" value="elderlyCare" className="radio-input" />
                    <label htmlFor="elderlyCare" className="radio-label">Elderly Care</label>
                </div>
                <div className="radio-container">
                    <input type="radio" id="homeCare" name="serviceType" value="homeCare" className="radio-input" />
                    <label htmlFor="homeCare" className="radio-label">Home Care</label>
                </div>
            </div>
        </div>

        <p>Professional Records</p>
        <button type="submit" >Add a File</button>
        <div className="AddCaregiver1">
            <label>Comments</label>
            <input type="text" name="comments" placeholder="Comments" />
        </div>
        <button type="submit" >Save</button>
    </form>
  );
};

export default AddCaregiver;