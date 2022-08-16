import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Error.css';
const Error = () => {
    const navigate = useNavigate();
    return (
        <div className="error-container">
            <img
                src={'https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png'}
                alt='' />
            <span onClick={() => navigate(-1)} className="link-home">
                Go back
            </span>
        </div>
    )
}
export default Error;