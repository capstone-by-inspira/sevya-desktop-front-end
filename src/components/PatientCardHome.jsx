import React from 'react';
import '../components/css/PatientCardHome.css'


const PatientCardHome = () => {
 
    return (
        <section>
            <div>
                <div className='PatientCardHome1'>
                    <div className='PatientCardHome2'>
                        <img src="" alt="Patient Image" />
                    </div>
                    <p>Jack(Male) new</p>
                    <p>(Hypertension, Diabetes)</p>
                    <a className='PatientCardHome3' href="#">View Details</a>

                </div>
            </div>
        </section>
    );
};

export default PatientCardHome;