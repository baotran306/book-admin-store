import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../NavBar/SideBar";
import { Navigate, Outlet } from "react-router-dom";
import './Layout.css'
const Layout = (props: any) => {
    return (
        sessionStorage.getItem('accessToken') ?
            <div className="layout">
                <div style={{ width: '200px' }}>
                    <SideBar />
                </div>
                <div className="layoutContainer">
                    <div style={{ height: '50px', width: '750px' }}>
                        <NavBar />
                    </div>
                    <div className="children">
                        <Outlet />
                    </div>
                </div>
            </div> : <Navigate to={'/login'} />
    )
}
export default Layout;