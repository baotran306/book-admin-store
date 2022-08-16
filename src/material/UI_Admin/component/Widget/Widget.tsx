import React from "react";
import './Widget.css'
const Widget = () => {
    return (
        <div className="widget">
            <div className="left">
                <span className="title">USERS</span>
                <span className="counter">2122</span>
                <span className="link">see all user</span>
            </div>
            <div className="right">right</div>
        </div>
    )
}

export default Widget;