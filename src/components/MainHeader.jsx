import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import BellNotification from './BellNotification';
import EmergencyModal from './EmergencyModal';

const MainHeader = ({ user , newNotification, triggerAlert, caregivers}) => {
  const navigate = useNavigate();
  
  // State for menu anchor
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);  // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null);  // Close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('shifts_info');

    navigate('/login');
    handleMenuClose();  // Close the menu after logout
  };


  return (
    <header className="main-header-root">
      <div className="welcome-container">
          <p className='font-weight-500'>Welcome, {user.name}!</p>
          <p>Admin Portal</p>
      </div>

      <div className="right-header-container">
        <div className="notification"><BellNotification newNotification={newNotification}/></div>
        {/* Avatar Dropdown for User */}
        <div className="user-logout-dropdown">
          <IconButton onClick={handleMenuClick}  aria-label="user menu" className='user-container'>
            <Avatar >{user.name[0]}</Avatar>  {/* Use first letter of user's name */}
            <div className="user-data-container">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
          </IconButton>
          {/* Menu for logout */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout, see you next time !</MenuItem>
          </Menu>
        </div>
      </div>
      <EmergencyModal triggerAlert={triggerAlert} caregivers={caregivers}/>
    </header>
  );
};

export default MainHeader;
