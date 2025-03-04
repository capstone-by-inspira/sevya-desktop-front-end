import React from "react";
import '../components/css/AddPatient.css'


const AddPatient = () => {

  return (
    <form>
        <h2>Wellcome, Sarah</h2>
        <p>Add a Patient</p>
        <div className="AddPatient1">
            <label>Patient name</label>
            <input type="text" name="name" placeholder="Patient name" />
            <label>Age</label>
            <input type="text" name="age" placeholder="Age" />
            <label>Gender</label>
            <input type="text" name="gender" placeholder="Gender" />
            <label>Address</label>
            <input type="text" name="address" placeholder="Address" />
            <label>Emergency Contact</label>
            <input type="text" name="emergencyContact" placeholder="Emergency Contact" />
            <label>Relation with patient</label>        
            <input type="text" name="relation" placeholder="Daughter" />
            <label>Health Condition</label>
            <input type="text" name="health" placeholder="Diabetes" />
            <label>Medications</label>
            <input type="text" name="medication" placeholder="Aspirin(2x daily)" />
            <label>Alergies</label>
            <input type="text" name="alergies" placeholder="Penicillin" />
        </div>
        <p>Medical Records</p>
        <button type="submit" >Add a File</button>
        <div className="AddPatient1">
            <label>Comments</label>
            <input type="text" name="comments" placeholder="Comments" />
        </div>
        <button type="submit" >Save</button>
    </form>
  );
};

export default AddPatient;