import React from 'react';
import './css/MyAdminProfileCardDesktop.css'



const MyAdminProfileCardDesktop = () => {
 
    return (
        <section className='myadminprofilecardsection'>
            <div className='myadminprofilecard'>
                <div>
                    <p>237 Boulevard Park</p>
                    <p>Surrey,BC</p>
                    <strong>Mailing Address</strong>
                </div>
                <div>
                    <p>+1 765-987-4555</p>
                    <strong>Mobile</strong>
                </div>
                <div>
                    <p>sarahwilliams@gmail.com</p>
                    <strong>Email Address</strong>
                </div>
            </div>
        </section>
    );
};

export default MyAdminProfileCardDesktop;