import React, { useEffect, useState } from 'react';
import './SideBar.css'
import {
    Dashboard
    , PersonOutlineOutlined
    , CreditCard
    , Store
    , LocalShipping
    , AccountCircleOutlined
    , ExitToAppOutlined
    , ArrowDropDown
    , ArrowDropUp
    , Summarize
} from '@mui/icons-material'
import Dropdown from '../Dropdown/DropdownProduct';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const navigate = useNavigate();
    const [dropdownProduct, setDropdownProduct] = useState(false);
    const [dropDownOrder, setDropdownOrder] = useState(false);
    var item = document.getElementsByTagName('li');
    const handleClickDropDownProduct = () => {
        setDropdownProduct(!dropdownProduct);
    }
    useEffect(() => {
        for (var i = 0; i < item.length; i++) {
            item[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace('active', ' ');
                this.className += 'active';
            })
        }
    }, [dropdownProduct, dropDownOrder])

    const handleDropdownOrder = () => {
        setDropdownOrder(!dropDownOrder);
    }
    return (
        <div className='sideBar'>
            <div className='top'>
                <span className='logo'>Book store</span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className='title'>Trang chủ</p>
                    <li className='active'>
                        <Dashboard className='icon' />
                        <span>Thống kê</span>
                    </li>
                    <p className='title'>Danh sách chỉ mục</p>
                    <li>
                        <PersonOutlineOutlined className='icon' />
                        <span>Nhân viên</span>
                    </li>
                    <li onClick={handleClickDropDownProduct}>
                        <Store className='icon' />
                        <span>Sản phẩm</span>
                        {dropdownProduct ? <ArrowDropUp className='icon dropdown-icon' /> : <ArrowDropDown className='icon dropdown-icon' />}
                    </li>
                    {dropdownProduct ? <Dropdown /> : <></>}
                    <li onClick={() => navigate("/order")}>
                        <CreditCard className='icon' />
                        <span>Đơn đặt hàng</span>
                    </li>
                    <li onClick={() => navigate('/delivery')}>
                        <LocalShipping className='icon' />
                        <span>Vận chuyển</span>
                    </li>
                    <p className='title'>Báo cáo</p>
                    <li onClick={() => navigate("/report")}>
                        <Summarize className='icon' />
                        <span>Báo cáo</span>
                    </li>
                    <p className='title'>Người dùng</p>
                    <li>
                        <AccountCircleOutlined className='icon' />
                        <span>Trang cá nhân</span>
                    </li>
                    <li onClick={() => {
                        sessionStorage.removeItem('accessToken');
                        navigate('/login');
                    }}>
                        <ExitToAppOutlined className='icon' />
                        <span>Đăng xuất</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'>
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}
export default SideBar;