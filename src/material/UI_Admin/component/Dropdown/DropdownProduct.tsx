import React from "react";
import './DropdownProduct.css'
import {
    Store
    , ColorLens
    , BrandingWatermark
    , Discount
    , Bookmarks
    , AllInclusive
} from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
const Dropdown = () => {
    const redirect = useNavigate();
    return (
        <div className="items">
            <ul>
                <li onClick={() => redirect('/product')}>
                    <Store className="icon" />
                    <span>Sách</span>
                </li>
                {/* <li onClick={() => redirect('/product')} >
                    <ColorLens className="icon" />
                    <span>Color</span>
                </li>
                <li>
                    <BrandingWatermark className="icon" />
                    <span>Brand</span>
                </li>
                <li>
                    <Discount className="icon" />
                    <span>Discount</span>
                </li>
                <li>
                    <Bookmarks className="icon" />
                    <span>Label</span>
                </li>
                <li>
                    <AllInclusive className="icon" />
                    <span>Material</span>
                </li> */}
            </ul>
        </div >
    )
}
export default Dropdown;