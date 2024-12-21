import React from "react";
import "./LogOut.css";
import { useAuth0 } from "@auth0/auth0-react";

// Define a LogoutButton component that calls the logout method when clicked
const LogoutButton = () => {
    const { logout } = useAuth0();
  
    // Specify the URL to redirect to after logging out
    const logoutUrl = `${'https://d3g1qw60hz7yw7.cloudfront.net/'}`; // change this route for aws integration

    return (
      <button className='log-out-button' onClick={() => logout({ returnTo: logoutUrl })}>
        Log Out
      </button>
    );
};

export default LogoutButton;
