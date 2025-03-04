import React, { useState } from 'react';
import '../components/css/CaregiverCard.css';
import { FaEdit } from 'react-icons/fa';

const CaregiverCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='OpenShiftsCardSection'>
            <div className='OpenShiftsCard'>
                {/* Toggle Header */}
                <div className="card-header-caregiver" onClick={() => setIsOpen(!isOpen)}>
                    <div className='caregiverCard4'>
                        <img src="" alt="Caregiver Image" />
                        <p>Adrian Martin(Male)</p>
                    </div>
                    <p>Nursing Technician, Elderly Care</p>
                    <p className='caregiverCard5'>+1 672-778-1234</p>
                    <span className={`arrow1 ${isOpen ? 'open1' : ''}`}>&#9660;</span> {/* Down Arrow (▼) */}
                </div>

                {/* Show content only if isOpen is true */}
                {isOpen && (
                    <>
                    <div className='cargiverCard2'>
                        <div className='cargiverCard3'>
                            <div className='caregiverCard1'>
                                <p>Name:</p>
                                <p>Adrian Martin</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                            <div className='caregiverCard1'>
                                <p>Age:</p>
                                <p>34</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                            <div className='caregiverCard1'>
                                <p>Gender:</p>
                                <p>Male</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                            <div className='caregiverCard1'>
                                <p>Address:</p>
                                <p>763 Mountain St, BC</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className='caregiverCard1'>
                                <p>Graduation:</p>
                                <p>Nursing Technician</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                            <div className='caregiverCard1'>
                                <p>Experience:</p>
                                <p>5 years</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
                            <div className='caregiverCard1'>
                                <p>Education:</p>
                                <p>St`s George University</p>
                                <button className="edit-button">
                                    <FaEdit className="edit-icon" />
                                </button>
                            </div>
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
                    </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CaregiverCard;