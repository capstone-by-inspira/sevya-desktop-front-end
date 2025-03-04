import React, { useState } from 'react';
import './css/OnGoingShiftsCardDesktop.css';
import ShiftCard from "../components/ShiftCard";

const AllShiftsCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='OpenShiftsCardSection'>
            <div className='OpenShiftsCard'>
                {/* Toggle Header */}
                <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
                    <h2>All Shifts</h2>
                    <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span> {/* Down Arrow (▼) */}
                </div>

                {/* Show content only if isOpen is true */}
                {isOpen && (
                    <>
                        <p>Filter by: Caregiver  Patient  Date</p>
                        <div>
                            <ShiftCard />
                            <ShiftCard />
                            <ShiftCard />
                            <ShiftCard />
                            <ShiftCard />
                            <ShiftCard />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default AllShiftsCard;
