import React from "react";
import NavBar from "../NavBar/NavBar";
import './Home.css';
import SideBar from "../NavBar/SideBar";
import Widget from "../Widget/Widget";

const Home = () => {
    return (
        <div className="home">
            <Widget />
            <Widget />
            <Widget />
            <Widget />
        </div>
    )
}
export default Home;