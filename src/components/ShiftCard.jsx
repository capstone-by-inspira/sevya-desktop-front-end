import React, { useState } from "react";
import './css/ShiftCard.css'

const ShiftCard = () => {
    const [selectedCaregiver, setSelectedCaregiver] = useState("");

    const handleChange = (event) => {
        setSelectedCaregiver(event.target.value);
    };

    return (
        <section className='ShiftCardSection'>
            <div className='ShiftCard'>
                <div className='ShiftCard1'>
                    <p>Patient:</p>
                    <p>Adam Tomas</p>
                </div>
                <div className='ShiftCard1'>
                    <label htmlFor="cargiverchoice">Caregiver: </label>
                    <select id="cargiverchoice" value={selectedCaregiver} onChange={handleChange}>
                        <option value="" disabled>Select a Caregiver</option>
                        <option value="banana">John Doe</option>
                        <option value="apple">George Michael</option>
                    </select>
                </div>
                <div  className='ShiftCard1'>
                    <p>Addresss:</p>
                    <p>123 Pender St, Burnaby, BC</p>
                </div>
                <div  className='ShiftCard1'>
                    <p>Date&Time:</p>
                    <p>02/12/2025, 8:00 AM - 11:00 AM</p>
                </div>
            </div>
        </section>
    );
};

export default ShiftCard;
