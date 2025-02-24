import React, { useState , useEffect} from 'react';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';
// import CreateEventPopup from "../components/CreateEventPopup";

export const HomePage = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

//   useEffect(() => {
//     if(eventId == null){
//       setActiveItem('home');
//     }else{
//       setActiveItem('caregiver')
//     }
//   }, [eventID]); 


 

  return (
    <>
      <div className='main-container'>
        <div className='sidebar-container'><SideBar activeItem={activeItem} setActiveItem={setActiveItem} user={user} /></div> 
        <div className='main-content-container'> <MainContent activeItem={activeItem} setActiveItem={setActiveItem}  /></div>
        </div>
    </>
  );
}