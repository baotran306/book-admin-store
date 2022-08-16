import React from "react";
import { Container } from "react-bootstrap";
import './NavBar.css'
import {
    SearchOutlined, LanguageOutlined
    , NotificationsNoneOutlined
    , DarkModeOutlined
    , ListOutlined
} from '@mui/icons-material'
import { Avatar } from "@mui/material";

const NavBar = () => {
    return (
        <div className="navbar-app">
            <div className="wrapper-app">
                <div className="search">
                    <input type={'text'} placeholder={'Tìm...'} />
                    <SearchOutlined />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlined className="icon" />
                        Vietnamese
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlined className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <DarkModeOutlined className="icon" />
                    </div>
                    <div className="item">
                        <ListOutlined className="icon" />
                    </div>
                    <div className="item">
                        <Avatar src="https://img2.thuthuatphanmem.vn/uploads/2018/11/30/anh-dai-dien-anime-dep_104204759.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavBar;