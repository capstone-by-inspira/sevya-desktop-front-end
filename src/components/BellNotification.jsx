import React, { useState, useEffect, useRef } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const BellNotification = ({ newNotification }) => {
  console.log(newNotification, 'new');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const isFirstRender = useRef(true); // Track first render

  // Function to play notification sound
  const playNotificationSound = () => {
    const audio = new Audio("./notificationSound.mp3"); // Ensure this file exists in your public folder
    audio.play().catch((error) => console.error("Audio play failed:", error));
  };

  // Effect to add newNotification to the list and play sound
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip first render
      return;
    }

    if (newNotification && !notifications.some((n) => n.id === newNotification.id)) {
      const formattedNotification = {
        id: newNotification.id,
        title: newNotification.title,
        body: newNotification.body,
        createdBy: newNotification.createdBy,
        createdAt: new Date(newNotification.createdAt).toLocaleString(),
      };
      setNotifications((prev) => [formattedNotification, ...prev]); // Add to top
      playNotificationSound(); // Play sound on new notification
    }
  }, [newNotification]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Bell Icon with Notification Badge */}
      {console.log(notifications.length, "notification-length")}
      <IconButton color="primary" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error" overlap="circular">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notification Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300,
            width: "300px",
          },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem key={index}>
              <Typography variant="body2">
                <strong>{notification.title}</strong>: {notification.body} <br />
                <em>By {notification.createdBy}</em>
              </Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography variant="body2" color="textSecondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default BellNotification;
