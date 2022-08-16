import React, { useEffect, useState } from "react";
import {
    EmailOutlined,
    HomeOutlined,
    SmartphoneOutlined,
    HelpOutlineOutlined,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import './OrderDetail.css';
import Axios from "../../../Axios";
import { useParams } from 'react-router-dom';
import moment from "moment";


const DeliveryDetailItem = (props: any) => {
    return (
        <div className="detail">
            <div className="product-detail">
                <div className="img-product-detail">
                    <img src={`http://127.0.0.1:5000/get-image/${props.item.image}`}></img>
                </div>
                <div className="product">
                    <div className="product-name">{props.item.book_name}</div>

                </div>
            </div>
            <div className="price-detail">
                <span>{Intl.NumberFormat().format(props.item.price)}</span>
            </div>
            <div className="quantity-detail">
                <div>{props.item.quantity}</div>
            </div>
            <div className="total-temp-detail">
                <span style={{ display: 'flex', justifyContent: 'right' }}>{Intl.NumberFormat().format(props.item.quantity * props.item.price)}</span>
            </div>
        </div>
    )
}

const OrderDetail = () => {
    const { cart_id } = useParams();
    const bill = {
        receiver_info: {
            "address": "",
            "cart_id": 0,
            "email": "",
            "first_name": "",
            "last_name": "",
            "order_cart_time": "",
            "phone_number": "",
            "status_id": 0,
            "status_name": ""
        },
        list_item: [
            {
                "book_name": "",
                "cart_id": 0,
                "image": "",
                "isbn": "",
                "price": "",
                "quantity": 0
            }
        ],
        total: 0
    }
    const [billDetail, setBillDetail] = useState(bill);
    const location = useLocation();
    let state = location.state as any;

    useEffect(() => {
        Axios.get(`/staff/get-customer-order/${cart_id}`)
            .then((res) => {
                let billDetailTemp = res.data[0];
                console.log(billDetailTemp);
                setBillDetail(billDetailTemp);
            }).catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <div className="order-detail">
            <div className="header-order">
                <div className="infor-customer">
                    <div className="notify-state">
                        <div style={{ display: 'flex', fontSize: '19px', fontWeight: '300' }}>Mã đơn hàng: {billDetail.receiver_info.cart_id} - <span style={{ paddingLeft: '5px', fontWeight: '500' }}>
                            {billDetail.receiver_info.status_id === 1 ? 'Đơn hàng chờ xác nhận' :
                                billDetail.receiver_info.status_id === 2 ? 'Đơn hàng đang giao' :
                                    billDetail.receiver_info.status_id === 3 ? 'Đơn hàng đã giao' :
                                        'Đơn hàng đã hủy'}
                        </span></div>
                        <div>Ngày đặt hàng: {moment(billDetail.receiver_info.order_cart_time).format('DD/MM/YYYY, hh:mm:ss')}</div>
                    </div>
                    <div className="name" style={{ fontWeight: '500' }}><HelpOutlineOutlined className="icon" /><span>{billDetail.receiver_info.last_name}{" "}{billDetail.receiver_info.first_name}</span></div>
                    <div className="phoneNumber"><SmartphoneOutlined className="icon" /><span>{billDetail.receiver_info.phone_number}</span></div>
                    <div className="address"><HomeOutlined className="icon" /><span>{billDetail.receiver_info.address}</span></div>
                    <div className="mail"><EmailOutlined className="icon" /><span>{billDetail.receiver_info.email}</span></div>
                </div>
            </div>
            <div className="main-order">
                <div className="top-order">
                    <div className="navNar-detail">
                        <div className="product-title">
                            <div></div>
                            <div>Tên sách</div>
                            <div></div>
                        </div>
                        <div className="price-title">
                            <div></div>
                            <div>Đơn giá</div>
                            <div></div>
                        </div>
                        <div className="quantity-title">
                            <div></div>
                            <div>Số lượng</div>
                            <div></div>
                        </div>
                        <div className="total-temp-title">
                            <div></div>
                            <div style={{ display: 'flex', justifyContent: 'right' }}>Tạm tính</div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="center-order">
                    {billDetail.list_item.map((item: any) => (
                        <DeliveryDetailItem key={item.id} item={item} />)
                    )}
                </div>
                <div className="bottom-order">
                    <div className="end-line">
                        <div className="total-title">Thành tiền</div>
                        <div className="total-price"><span>{Intl.NumberFormat().format(billDetail.total)}</span></div>
                    </div>
                </div>
            </div>
            <div className="footer-order">
                <div className="link-back">
                    <Link to={"/order"}>Trở lại trang hóa đơn</Link>
                    <Link to={`/invoice/${cart_id}`}>Xem hóa đơn</Link>
                </div>
            </div>
        </div>
    )
}
export default OrderDetail;